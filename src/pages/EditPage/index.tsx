import { Input, Select, Button, Image } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import clsx from 'clsx';
import Style from 'components/Header/style';
import { SLOGANS } from 'constants/slogan';
import {
  getProvince,
  getCommune,
  getDistrict,
  getAllProvinces,
  getAllDistricts,
  getAllCommunes,
} from 'helpers';
import { validURL } from 'helpers/validate';
import { useCreatePost } from 'hooks/post/create/useCreatePost';
import { upperFirst } from 'lodash';
import { IntroductionTitle } from 'pages/CreatePost/components';
import { PreviewPost } from 'pages/CreatePost/components/PreviewPost';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm, Controller } from 'react-hook-form';
import { AiOutlineSafety } from 'react-icons/ai';
import { FcFullTrash } from 'react-icons/fc';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
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
export const EditPostPage = () => {
  const navigate = useNavigate();
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
      File & {
        preview: string;
      }
    >
  >([]);
  const createPostMutation = useCreatePost();
  const [residence, setResidence] = React.useState({
    province: '',
    district: '',
    ward: '',
  });

  // TODO: save in link photo image
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
  });

  //  TODO: Checking api
  React.useEffect(() => {
    toast.dismiss();
    if (createPostMutation.isLoading) {
      toast.loading('Creating post...');
      return;
    }
    if (createPostMutation.isSuccess) {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      toast.success('Creating post success');
      navigate('/');
      return;
    }
  }, [createPostMutation.isLoading, createPostMutation.isSuccess]);
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

  const onSubmit = (data: FieldCreatePost) => {
    const province = getProvince(data.id_province);
    const ward = getCommune(data.id_ward);
    const district = getDistrict(data.id_district);
    createPostMutation.mutate({
      ...data,
      province,
      district,
      ward,
      photos: files,
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
                defaultValue=''
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
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    defaultValue=''
                    {...field}
                    className='col-4'
                    style={{
                      paddingLeft: '0',
                    }}
                    onChange={(province) => {
                      setResidence({ ...residence, province });
                      field.onChange(province);
                    }}
                  >
                    <Option value={''}>Please Choose Province</Option>
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
                rules={{ required: true }}
                render={({ field }) => (
                  <React.Fragment>
                    <Select
                      defaultValue=''
                      className='col-4'
                      style={{
                        paddingRight: '0',
                      }}
                      {...field}
                      onChange={(district) => {
                        setResidence({ ...residence, district });
                        field.onChange(district);
                      }}
                    >
                      <Option value={''}>Please Choose District</Option>

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
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className='col-4'
                    defaultValue={''}
                    style={{
                      paddingRight: '0',
                    }}
                    onChange={(ward) => {
                      setResidence({ ...residence, ward });
                      field.onChange(ward);
                    }}
                  >
                    <Option value={''}>Please Choose Ward</Option>

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
              {!errors.id_province && !errors.id_district && errors.id_ward && (
                <span className='waring-error'>Ward is required</span>
              )}
            </div>
            <div className='form-input'>
              <label>Resident address</label>
              <Controller
                name='residential_address'
                control={control}
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
                <span className='waring-error'>Resident address required</span>
              )}
            </div>
            <div className='form-input'>
              <label> Content</label>
              <Controller
                name='content'
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder='Explain your post'
                    autoSize
                  />
                )}
              />
              {errors.content && (
                <span className='waring-error'>Resident address required</span>
              )}
            </div>

            <div className='form-input'>
              <label>URL chat room</label>
              <Controller
                name='join_url'
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
                  <Image.PreviewGroup>{renderThumbsFile()}</Image.PreviewGroup>
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
                disabled={createPostMutation.isLoading}
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
    </Style>
  );
};
