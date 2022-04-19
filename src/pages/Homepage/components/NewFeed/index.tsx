import { Button, Dropdown, Image, Menu } from 'antd';
import clsx from 'clsx';
import { AvatarCustom } from 'components/Avatar';
import PopupLogin from 'components/PopupSuggestLogin';
import { PHOTO_DISPLAY } from 'constants/devices';
import { useDeletePost } from 'hooks/post/delete/useDeletePost';
import _toString from 'lodash/toString';
import React from 'react';
import { BiGroup } from 'react-icons/bi';
import { BsLinkedin, BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { FcComments, FcShare } from 'react-icons/fc';
import { VscLocation } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton,
} from 'react-share';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/users/state';
import Style from './style';
import { BoxComment } from '../Comment';

interface NewFeedProps extends PostInfo {
  handleDeletePost?: (id: string) => void;
}
export const NewFeed = (props: NewFeedProps) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const { handleDeletePost } = props;
  const [isBtnJoinClick, setIsBtnJoinClick] = React.useState(false);
  const deletePost = useDeletePost();
  const url_detail = `https://betheheros.tk/post/detail/${props.post_id}`;

  const SIZE_CONTENT = 300;
  const handleClickDelete = () => {
    deletePost.mutate({
      post_id: props.post_id,
    });
  };
  React.useEffect(() => {
    toast.dismiss();
    if (deletePost.isSuccess) {
      handleDeletePost && handleDeletePost(_toString(props.post_id));
      return;
    }
    if (deletePost.isError) {
      toast.error('Something went wrong');
      return;
    }
    if (deletePost.isLoading) {
      toast.loading('Deleting your post...');
      return;
    }
  }, [
    deletePost.isLoading,
    deletePost.isSuccess,
    deletePost.data,
    deletePost.isError,
  ]);
  const isOwnerPost = user.uid === props.uid;
  const dropdownMore = (
    <Menu>
      {isOwnerPost && (
        <React.Fragment>
          <Menu.Item>
            <Button
              className='w-100'
              style={{
                backgroundColor: 'var(--bs-success)',
                color: 'var(--bs-white)',
              }}
              onClick={() => navigate(`/edit-post/${props.post_id}`)}
            >
              Edit{' '}
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button
              disabled={deletePost.isLoading}
              onClick={() => handleClickDelete()}
              className='w-100'
              style={{
                backgroundColor: 'var(--bs-danger)',
                color: 'var(--bs-white)',
              }}
            >
              Delete
            </Button>
          </Menu.Item>
        </React.Fragment>
      )}

      <Menu.Item>
        <Button
          className='w-100'
          style={{
            backgroundColor: 'var(--bs-warning)',
            color: 'var(--bs-white)',
          }}
          onClick={() => navigate(`/post/detail/${props.post_id}`)}
        >
          View detail
        </Button>
      </Menu.Item>
    </Menu>
  );
  const dropdownShare = (
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
      />
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

  const renderPhotos = () => {
    const { photos } = props;

    if (!photos || photos.length === 0) return null;
    return photos.map((photo, index) => {
      const isFinalImage = index + 1 === PHOTO_DISPLAY;
      const hiddenClassName = clsx([
        { 'd-none': index + 1 > PHOTO_DISPLAY },
        'w-50 position-relative d-flex justify-content-center',
        {
          'w-100': (photos.length === 3 && index === 2) || photos.length === 1,
        },
      ]);
      return (
        <div className={hiddenClassName} key={index}>
          <Image
            src={photo}
            alt='post'
            style={{
              border: photos.length > 1 ? '2.25px solid var(--border)' : 'none',
            }}
          />
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

  const [tagName, setTagName] = React.useState('');
  const [view, setView] = React.useState('See more...');
  const setViewPost = () => {
    if (tagName === '') {
      setTagName('none');
      setView('See less...');
    } else {
      setTagName('');
      setView('See more...');
    }
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
            <AvatarCustom
              showPopover={true}
              size={64}
              bio='bio nè  fake chưa loading from db'
              fullName={props.fullname}
              uid={props.uid}
              address='Ha Noi address nè  fake chưa loading from db'
              srcAvatar={props.avatar}
            />

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
            {props.join_url && (
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
            )}
          </div>
        </div>
        <div className='Newfeed_body'>
          <h3>{props.title}</h3>

          <div className='Newfeed_body_title d-flex justify-content-start'>
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
          <div className='Newfeed_body_content'>
            <span className={`Newfeed_body_content_comment ${tagName}`}>
              {props.content}
            </span>
            {props.content.length < SIZE_CONTENT ? (
              ''
            ) : (
              <button
                className={`Newfeed_body_content_button`}
                onClick={setViewPost}
              >
                {view}
              </button>
            )}
          </div>
          <div className='Newfeed_body_photos'>
            {props.photos && props.photos.length > 0 && (
              <Image.PreviewGroup> {renderPhotos()}</Image.PreviewGroup>
            )}
          </div>
        </div>
        <div className='Newfeed_footer'>
          <Dropdown overlay={dropdownShare}>
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
            <FcComments
              color={'#673AB7'}
              style={{ fontSize: '120%', margin: '0 0.5rem 0.2rem' }}
            />{' '}
            Comment
          </Button>
          <Dropdown overlay={dropdownMore} placement='bottomLeft'>
            <Button type='link'>
              <BiGroup
                color={'var(--bs-success)'}
                style={{ fontSize: '120%', margin: '0 0.5rem 0.2rem' }}
              />
              More
            </Button>
          </Dropdown>
        </div>

        <BoxComment postId={+props.post_id} />
      </Style>
    </React.Fragment>
  );
};
