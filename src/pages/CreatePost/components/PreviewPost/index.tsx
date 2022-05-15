import { Button, Modal } from 'antd';
import clsx from 'clsx';
import { AvatarCustom } from 'components/Avatar';
import { PHOTO_DISPLAY } from 'constants/devices';
import Style from 'pages/Homepage/components/NewFeed/style';
import React from 'react';
import { BiGroup } from 'react-icons/bi';
import { FcBookmark, FcComments } from 'react-icons/fc';
import { IoMdShareAlt } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/users/state';

interface PreviewPostProps extends Partial<PostInfo> {
  visible: boolean;
  onCancel: () => void;
}

export const PreviewPost = React.memo((props: PreviewPostProps) => {
  const { visible, onCancel, photos, ...post } = props;
  const { level } = useRecoilValue(userState);
  const renderPhotos = () => {
    if (!photos || photos.length === 0) return null;
    return photos.map((photo, index) => {
      const isFinalImage = index + 1 === PHOTO_DISPLAY;
      const hiddenClassName = clsx([
        { 'd-none': index + 1 > PHOTO_DISPLAY },
        'w-50 position-relative',
        { 'w-100': (photos.length === 3 && index == 2) || photos.length === 1 },
      ]);
      return (
        <div
          className={hiddenClassName}
          key={index}
          style={{
            border: '1px solid var(--border)',
          }}
        >
          <img src={photo} alt='post' />
          {PHOTO_DISPLAY !== photos.length && isFinalImage && (
            <div
              className='position-absolute d-flex justify-content-center align-items-center'
              style={{
                top: '50%',
                color: '#f5f5f5',
                left: '50%',
                fontSize: '2rem',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: '100%',
                width: '100%',
              }}
            >
              +{photos.length - PHOTO_DISPLAY}
            </div>
          )}
        </div>
      );
    });
  };
  return (
    <Modal
      key={1}
      maskClosable={true}
      visible={visible}
      onCancel={onCancel}
      onOk={onCancel}
    >
      <Style
        style={{
          marginTop: '2rem',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className='Newfeed_head'>
          <div className='Newfeed_head_info'>
            <AvatarCustom
              showPopover={true}
              size={64}
              bio='bio nè  fake chưa loading from db'
              uid='1'
              fullName='Nguyễn Văn A'
              address='Ha Noi address nè  fake chưa loading from db'
              srcAvatar={props.avatar || ''}
              isVerified
            />
            <div className='Newfeed_head_info_detail'>
              <h6>{props.fullname}</h6>
              <p
                style={{
                  marginLeft: 0,
                }}
              >
                {new Date().toDateString()}
              </p>
            </div>
          </div>
          <div className='Newfeed_head_join'>
            {props.join_url && (
              <Button className='Newfeed_head_join_button' type='ghost'>
                Join
              </Button>
            )}
          </div>
        </div>
        <div className='Newfeed_body'>
          <h3>{props.title}</h3>

          <div className='Newfeed_body_title'>
            <p>
              Address:{' '}
              {[
                props.residential_address,
                props.ward,
                props.district,
                props.province,
              ]
                .filter((value) => value?.trim() !== '' && value !== undefined)
                .join(', ')}
            </p>
          </div>
          <div className='Newfeed_body_content'>{props.content}</div>
          <div className='Newfeed_body_photos'>{renderPhotos()}</div>
        </div>
        <div className='Newfeed_footer'>
          <Button type='link'>
            <IoMdShareAlt
              style={{ fontSize: '150%', margin: '0 0.5rem 0.2rem' }}
            />{' '}
            Share
          </Button>
          <Button
            type='link'
            style={{
              color: '#673AB7',
            }}
          >
            <FcComments
              color={'#673AB7'}
              style={{ fontSize: '120%', margin: '0 0.5rem 0.2rem' }}
            />{' '}
            Comment
          </Button>
          <Button type='link'>
            <BiGroup
              color={'var(--bs-success)'}
              style={{ fontSize: '120%', margin: '0 0.5rem 0.2rem' }}
            />
            More
          </Button>
        </div>
      </Style>
    </Modal>
  );
});
