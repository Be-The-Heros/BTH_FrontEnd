import { Button, Image, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import clsx from 'clsx';
import Loading from 'components/Loading';
import { LIMIT_FILE, SLOGANS } from 'constants/slogan';
import {
  getAllCommunes,
  getAllDistricts,
  getAllProvinces,
  getCommune,
  getDistrict,
  getIDDistrictByName,
  getIDProvinceByName,
  getIDWardByName,
  getProvince,
} from 'helpers';
import { validURL } from 'helpers/validate';
import { useGenerateURLImage } from 'hooks/image/useCreateImageURL';
import { useQueryPostDetail } from 'hooks/post/detail/useDetailPost';
import { useEditPost } from 'hooks/post/edit/useEditPost';
import { upperFirst } from 'lodash';
import { IntroductionTitle } from 'pages/CreatePost/components';
import { PreviewPost } from 'pages/CreatePost/components/PreviewPost';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineSafety } from 'react-icons/ai';
import { FcFullTrash } from 'react-icons/fc';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import Style from './style';
interface FieldCreatePost {
  title: string;
  content: string;
  id_province: string;
  id_ward: string;
  id_district: string;
  residential_address: string;
  join_url: string;
}

const { Option } = Select;

const TIME_CHANGE_TEXT = 3000;
interface FileUpload {
  file?: File;
  preview: string;
  isOldFile?: boolean;
}
export const EditPostPage = () => {
  const navigate = useNavigate();
  const { post_id } = useParams<{ post_id: string }>();
  const postData = useQueryPostDetail(post_id || '');

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FieldCreatePost>();
  let refInterval = React.useRef<any>();

  const [isOpenPreview, setIsOpenPreview] = React.useState(false);
  const [randomSlogan, setRandomSlogan] = React.useState(
    Math.floor(Math.random() * SLOGANS.length)
  );
  const [files, setFiles] = React.useState<
    Array<
      Partial<File> & {
        preview: string;
      }
    >
  >([]);
  const editPostMutation = useEditPost();
  const [residence, setResidence] = React.useState({
    province: '',
    district: '',
    ward: '',
  });

  const createUrlMutation = useGenerateURLImage();
  React.useEffect(() => {
    if (postData.data?.photos) {
      setFiles(
        postData.data?.photos.map((item) => ({
          preview: item,
        }))
      );
    }
  }, []);
  // TODO: save in link photo image
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',

    onDrop: (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      if (newFiles.length + files.length > LIMIT_FILE) {
        toast.warning('You can only upload 10 images');
        return;
      }
      setFiles([...files, ...newFiles]);
    },
  });

  //  TODO: Checking api
  React.useEffect(() => {
    toast.dismiss();
    if (editPostMutation.isLoading) {
      toast.loading('Editing post...');
      return;
    }
    if (editPostMutation.isSuccess) {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      toast.success('Edit post success');
      navigate('/');
      return;
    }
  }, [editPostMutation.isLoading, editPostMutation.isSuccess]);

  React.useEffect(() => {
    if (postData.isSuccess) {
      setResidence({
        province: getIDProvinceByName(postData.data.province),
        district: getIDDistrictByName(postData.data.district),
        ward: getIDWardByName(postData.data.ward),
      });
      setFiles(postData.data.photos?.map((item) => ({ preview: item })) || []);
      return;
    }
  }, [postData.data]);

  // TODO: change slogan
  React.useEffect(() => {
    refInterval.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * SLOGANS.length);
      setRandomSlogan(randomIndex);
    }, TIME_CHANGE_TEXT);
  }, []);

  // TODO: render images
  const renderThumbsFile = () => {
    return files.map((file, index) => {
      const imageClassName = clsx(
        {
          ['pl-0']: (index + 1) % 3 === 1,
          // ['pr-0']: (index + 1) % 3 === 0,
        },
        'col-4 item-image'
      );

      return (
        <div className={imageClassName} key={index}>
          <div
            className='w-100'
            style={{
              marginTop: '0.25rem',
              position: 'relative',
            }}
          >
            <Image
              src={file.preview}
              style={{
                objectFit: 'cover',
              }}
              alt='preview'
            />
            <FcFullTrash
              style={{
                position: 'absolute',
                top: '0.25rem',
                right: '0.25rem',
                fontSize: '1.25rem',
                cursor: 'pointer',
              }}
              onClick={() => setFiles([...files.filter((f, i) => i !== index)])}
            />
          </div>
        </div>
      );
    });
  };

  // unmount
  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      clearInterval(refInterval.current);
    };
  }, []);

  const onSubmit = async (data: FieldCreatePost) => {
    const province = getProvince(data.id_province);
    const ward = getCommune(data.id_ward);
    const district = getDistrict(data.id_district);

    const newPhotos = files.filter((file) => file.size);
    let convertUrl: string[] = [];
    if (newPhotos.length) {
      convertUrl = await (await createUrlMutation.mutateAsync(newPhotos)).urls;
    }
    const oldPhotos = files.filter((file) => !file.size);

    editPostMutation.mutate({
      post_id: post_id,
      content: data.content,
      province,
      district,
      ward,
      photos: [...convertUrl, ...oldPhotos.map((file) => file.preview)],
      residential_address: data.residential_address,
      updated_at: new Date(),
      title: data.title,
      join_url: data.join_url,
    });
  };

  return (
    <Style className='create-post-page'>
      <PreviewPost
        content={watch('content')}
        joined={1000}
        title={watch('title')}
        visible={isOpenPreview}
        ward={getCommune(residence.ward)}
        district={getDistrict(residence.district)}
        province={getProvince(residence.province)}
        onCancel={() => setIsOpenPreview(false)}
        residential_address={watch('residential_address')}
        photos={files.map((file) => file.preview)}
      />
      {postData.isLoading ? (
        <Loading />
      ) : (
        <form className='container-fluid' onSubmit={handleSubmit(onSubmit)}>
          <div className='container header'>
            <div className='slide-right'>{SLOGANS[randomSlogan]}</div>
          </div>
          <div className='container d-flex'>
            <div className='content w-70'>
              <div className='form-input'>
                <label>Title</label>
                <Controller
                  name='title'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={postData.data?.title}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder='Enter Title'
                      onFocus={(e) => {
                        console.log(e.target.height);
                      }}
                    />
                  )}
                />
                {errors.title && (
                  <span className='waring-error'>Title is required</span>
                )}
              </div>
              <div className='form-input'>
                <label className='w-100'>Residence</label>
                <Controller
                  name='id_province'
                  control={control}
                  defaultValue={residence.province}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className='col-4'
                      style={{
                        paddingLeft: '0',
                      }}
                      value={residence.province}
                      onChange={(province) => {
                        setResidence({ ...residence, province });
                        field.onChange(province);
                      }}
                    >
                      {/* <Option value={''}>Please Choose Province</Option> */}
                      {getAllProvinces().map((province) => (
                        <Option
                          value={province.idProvince}
                          key={province.idProvince}
                        >
                          {province.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  name='id_district'
                  control={control}
                  defaultValue={residence.district}
                  render={({ field }) => (
                    <React.Fragment>
                      <Select
                        {...field}
                        className='col-4'
                        style={{
                          paddingRight: '0',
                        }}
                        value={residence.district}
                        onChange={(district) => {
                          setResidence({ ...residence, district });
                          field.onChange(district);
                        }}
                      >
                        {getAllDistricts(residence.province).map((district) => (
                          <Option
                            value={district.idDistrict}
                            key={district.idDistrict}
                          >
                            {district.name}
                          </Option>
                        ))}
                      </Select>
                    </React.Fragment>
                  )}
                />
                <Controller
                  name='id_ward'
                  control={control}
                  defaultValue={residence.ward}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className='col-4'
                      style={{
                        paddingRight: '0',
                      }}
                      value={residence.ward}
                      onChange={(ward) => {
                        setResidence({ ...residence, ward });
                        field.onChange(ward);
                      }}
                    >
                      {getAllCommunes(residence.district).map((ward) => (
                        <Option value={ward.idCommune} key={ward.idCommune}>
                          {ward.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                {errors.id_province && (
                  <span className='waring-error'>Province is required</span>
                )}
                {!errors.id_province && errors.id_district && (
                  <span className='waring-error'>District is required</span>
                )}
                {!errors.id_province &&
                  !errors.id_district &&
                  errors.id_ward && (
                    <span className='waring-error'>Ward is required</span>
                  )}
              </div>
              <div className='form-input'>
                <label>Resident address</label>
                <Controller
                  name='residential_address'
                  control={control}
                  defaultValue={postData.data?.residential_address}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder='Enter resident address'
                      onBlur={(e) => {
                        field.onChange(
                          e.target.value
                            .split(' ')
                            .map((word) => upperFirst(word))
                            .join(' ')
                        );
                      }}
                    />
                  )}
                />
                {errors.residential_address && (
                  <span className='waring-error'>
                    Resident address required
                  </span>
                )}
              </div>
              <div className='form-input'>
                <label> Content</label>
                <Controller
                  name='content'
                  rules={{ required: true }}
                  control={control}
                  defaultValue={postData.data?.content}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder='Explain your post'
                      autoSize
                    />
                  )}
                />
                {errors.content && (
                  <span className='waring-error'>
                    Resident address required
                  </span>
                )}
              </div>

              <div className='form-input'>
                <label>URL chat room</label>
                <Controller
                  name='join_url'
                  defaultValue={postData.data?.join_url || ''}
                  rules={{
                    required: false,
                    validate: (value) => {
                      return (
                        !value || validURL(value || '') || value?.trim() === ''
                      );
                    },
                  }}
                  control={control}
                  render={({ field }) => (
                    <div className='w-50 position-relative'>
                      <Input
                        {...field}
                        style={{
                          paddingRight: '3rem',
                        }}
                        placeholder='Example: https://t.me/+de5i4MvIBAMzYmY1'
                      />
                      <AiOutlineSafety
                        className='icon-safe'
                        color={
                          validURL(watch('join_url'))
                            ? 'var(--bs-success)'
                            : 'var(--bs-danger)'
                        }
                      />
                    </div>
                  )}
                />

                {errors.join_url && (
                  <span className='waring-error'>Url is not valid</span>
                )}
              </div>

              <div className='form-input'>
                <label>Upload Image</label>
                <input {...getInputProps()} />
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside>
                  <div
                    className='d-flex w-100 flex-wrap preview'
                    style={{ margin: '1rem 0' }}
                  >
                    <Image.PreviewGroup>
                      {renderThumbsFile()}
                    </Image.PreviewGroup>
                  </div>
                </aside>
              </div>
              <div
                className='form-input d-flex justify-content-around'
                style={{
                  marginTop: '1rem',
                }}
              >
                <Button
                  type='primary'
                  htmlType='submit'
                  disabled={editPostMutation.isLoading}
                >
                  Publish
                </Button>
                <Button type='default' onClick={() => setIsOpenPreview(true)}>
                  Preview
                </Button>
              </div>
            </div>
            <div className='w-30 introduction'>
              <IntroductionTitle />
            </div>
          </div>
        </form>
      )}
    </Style>
  );
};
