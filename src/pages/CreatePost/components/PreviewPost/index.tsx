import { Button, Modal } from 'antd';
import clsx from 'clsx';
import { PHOTO_DISPLAY } from 'constants/devices';
import Style from 'pages/Homepage/components/NewFeed/style';
import React from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { FcBookmark } from 'react-icons/fc';
import { IoMdShareAlt } from 'react-icons/io';
import { MdOutlineStickyNote2 } from 'react-icons/md';

interface PreviewPostProps extends Partial<PostInfo> {
  visible: boolean;
  onCancel: () => void;
}

export const PreviewPost = React.memo((props: PreviewPostProps) => {
  const { visible, onCancel, photos, ...post } = props;

  const renderPhotos = () => {
    if (!photos || photos.length === 0) return null;
    return photos.map((photo, index) => {
      const isFinalImage = index + 1 === PHOTO_DISPLAY;
      const hiddenClassName = clsx([
        { 'd-none': index + 1 > PHOTO_DISPLAY },
        'w-50 position-relative',
      ]);
      return (
        <div
          className={hiddenClassName}
          style={{
            border: '1px solid var(--border)',
          }}
        >
          <img src={photo} alt='post' />
          {PHOTO_DISPLAY != photos.length && isFinalImage && (
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
            <img src={props.avatar} alt='avatar'></img>
            <div className='Newfeed_head_info_detail'>
              <h6>{props.name}</h6>
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
            <Button className='Newfeed_head_join_button' type='ghost'>
              Join
            </Button>
            <p>{props.joined} people</p>
          </div>
        </div>
        <div className='Newfeed_body'>
          <h3>{props.title}</h3>

          <div className='Newfeed_body_title'>
            <FcBookmark style={{ fontSize: '2.25rem' }} />
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
          <Button type='link'>
            <MdOutlineStickyNote2
              style={{ fontSize: '120%', margin: '0 0.5rem 0.2rem' }}
            />{' '}
            Comment
          </Button>
          <Button type='link'>
            <AiOutlineWarning
              style={{ fontSize: '120%', margin: '0 0.5rem 0.2rem' }}
            />{' '}
            Report
          </Button>
        </div>
      </Style>
    </Modal>
  );
});
