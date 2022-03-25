import { Button, Image, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import clsx from 'clsx';
import { SLOGANS } from 'constants/slogan';
import {
  getAllCommunes,
  getAllDistricts,
  getAllProvinces,
  getCommune,
  getDistrict,
  getProvince,
} from 'helpers';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { FcFullTrash } from 'react-icons/fc';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/users/state';
import { IntroductionTitle } from './components';
import { PreviewPost } from './components/PreviewPost';
import Style from './style';
import { AiOutlineSafety } from 'react-icons/ai';
import { validURL } from 'helpers/validate';
import { useCreatePost } from 'hooks/post/create/useCreatePost';
import upperFirst from 'lodash/upperFirst';
const { Option } = Select;
const TIME_CHANGE_TEXT = 3000;
interface FieldCreatePost {
  title: string;
  content: string;
  province: string;
  ward: string;
  district: string;
  residential_address: string;
  join_url: string;
}
const CreatePostPage = () => {
  // init State
  const user = useRecoilValue(userState);
  const {
    handleSubmit,
    control,
    reset,
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
    console.log(data);

    // files.forEach((file) => URL.revokeObjectURL(file.preview));
  };

  return (
    <Style className='create-post-page'>
      <PreviewPost
        content={watch('content')}
        avatar={user.avatar}
        name={user.first_name + ' ' + user.last_name}
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
                name='province'
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
                name='district'
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
                name='ward'
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
              {errors.province && (
                <span className='waring-error'>Province is required</span>
              )}
              {!errors.province && errors.district && (
                <span className='waring-error'>District is required</span>
              )}
              {!errors.province && !errors.district && errors.ward && (
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
                    onChange={(e) =>
                      e.target.value &&
                      field.onChange(
                        e.target.value
                          .split(' ')
                          .map((item) => upperFirst(item))
                          .join(' ')
                      )
                    }
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
                  required: true,
                  validate: (value) => {
                    return validURL(value);
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
              <Button type='primary' htmlType='submit'>
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

export default CreatePostPage;
