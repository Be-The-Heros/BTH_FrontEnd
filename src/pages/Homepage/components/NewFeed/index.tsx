import { Button, Dropdown, Image, Menu } from 'antd';
import clsx from 'clsx';
import PopupLogin from 'components/PopupSuggestLogin';
import { PHOTO_DISPLAY } from 'constants/devices';
import React from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { BsLinkedin, BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { FcShare } from 'react-icons/fc';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { VscLocation } from 'react-icons/vsc';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/users/state';
import Style from './style';

export const NewFeed = (props: PostInfo) => {
  const user = useRecoilValue(userState);
  const [isBtnJoinClick, setIsBtnJoinClick] = React.useState(false);

  const url_detail = 'https://betheheros.tk/';
  const dropDownShare = (
    <Menu>
      <Menu.Item
        key='1'
        icon={
          <FaFacebook
            color={'#3e79f7'}
            style={{
              marginRight: '0.25rem',
            }}
          />
        }
        className='d-flex align-items-center'
      >
        <FacebookShareButton
          hashtag='#be_the_heroes'
          quote={props.title}
          url={url_detail}
        >
          Share with Facebook
        </FacebookShareButton>
      </Menu.Item>
      <Menu.Item
        key='2'
        icon={
          <BsLinkedin
            color={'#3e79f7'}
            style={{
              marginRight: '0.25rem',
            }}
          />
        }
        className='d-flex  align-items-center'
      >
        <LinkedinShareButton url={url_detail}>
          Share with Linkedin
        </LinkedinShareButton>
      </Menu.Item>
      <Menu.Item
        key='2'
        icon={
          <BsTwitter
            color={'#3e79f7'}
            style={{
              marginRight: '0.25rem',
            }}
          />
        }
        className='d-flex  align-items-center'
      >
        <TwitterShareButton
          url={url_detail}
          hashtags={['be_the_heroes']}
          title={props.title}
        >
          Share with Twitter
        </TwitterShareButton>
      </Menu.Item>
    </Menu>
  );

  const { photos } = props;
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
          key={index}
          // style={{
          //   border: photos.length > 1 ? '1px solid var(--border)' : 'none',
          // }}
        >
          <Image src={photo} alt='post' />
          {PHOTO_DISPLAY != photos.length && isFinalImage && (
            <div
              className='position-absolute d-flex justify-content-center align-items-center'
              style={{
                top: '50%',
                color: '#f5f5f5',
                left: '50%',
                fontSize: '2rem',
                transform: 'translate(-50%, -50%)',
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
    <React.Fragment>
      <PopupLogin
        isOpen={isBtnJoinClick && !user.isLoggedIn}
        onClose={() => setIsBtnJoinClick(false)}
      />
      <Style>
        <div className='Newfeed_head'>
          <div className='Newfeed_head_info'>
            <img src={props.avatar} alt='avatar'></img>
            <div className='Newfeed_head_info_detail'>
              <h6
                style={{
                  fontWeight: 'bold',
                }}
              >
                {props.fullname}
              </h6>
              <p
                style={{
                  marginBottom: '0.25rem',
                }}
              >
                {new Date(props.updated_at).toDateString()}
              </p>
              <div className='Newfeed_head_info_detail_locate'>
                <VscLocation style={{ fontSize: '1.25rem' }} color='red' />
                <div>{props.residential_address}</div>
              </div>
            </div>
          </div>
          <div className='Newfeed_head_join'>
            <Button
              className='Newfeed_head_join_button'
              type='ghost'
              onClick={() => {
                setIsBtnJoinClick(true);
                if (props.join_url) window.open(props.join_url, '_blank');
              }}
            >
              Join
            </Button>
            {/* <p>{props.joined} people</p> */}
          </div>
        </div>
        <div className='Newfeed_body'>
          <h3>{props.title}</h3>

          <div className='Newfeed_body_title d-flex justify-content-center'>
            {/* <FcBookmark style={{ fontSize: '2.25rem' }} /> */}
            <div className='text'>
              Address:{' '}
              {[
                props.residential_address,
                props.ward,
                props.district,
                props.province,
              ]
                .filter((value) => value?.trim() !== '' && value !== undefined)
                .join(', ')}
            </div>
          </div>
          <div className='Newfeed_body_content'>{props.content}</div>
          <div className='Newfeed_body_photos'>
            {props.photos && props.photos.length > 0 && (
              <Image.PreviewGroup> {renderPhotos()}</Image.PreviewGroup>
            )}
          </div>
        </div>
        <div className='Newfeed_footer'>
          <Dropdown overlay={dropDownShare}>
            <Button type='link'>
              <FcShare
                style={{ fontSize: '150%', margin: '0 0.5rem 0.2rem' }}
              />{' '}
              Share
            </Button>
          </Dropdown>

          <Button
            type='link'
            style={{
              color: '#673AB7',
            }}
          >
            <MdOutlineStickyNote2
              color={'#673AB7'}
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
    </React.Fragment>
  );
};
