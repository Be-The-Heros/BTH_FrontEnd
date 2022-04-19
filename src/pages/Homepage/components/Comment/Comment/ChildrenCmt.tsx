import React, { ReactChild, useState } from 'react';
import { Button, Comment, Popover } from 'antd';
import { AvatarCustom, AvatarCustomProps } from 'components/Avatar';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/users/state';
import { Link } from 'react-router-dom';
import { useDeleteComment } from 'hooks/comment';
import { AddComment } from '../AddComment';

interface ChirldCmtProps {
  onShowAddCmt: (value: boolean) => void;
  isShowAddCmt: boolean;
  content: string;
  comment_id: number;
  post_id: number;
  avatar: AvatarCustomProps;
  repId?: number;
  chirld?: ReactChild;
}

export const ChirldCmt = (props: ChirldCmtProps) => {
  const {
    onShowAddCmt,
    isShowAddCmt,
    content,
    avatar,
    comment_id,
    post_id,
    chirld,
    repId,
  } = props;
  const { srcAvatar, uid, fullName, bio, address } = avatar;
  const [showOptionMessage, setShowOptionMessage] = useState(false);
  const [isEditCmt, setIsEditCmt] = useState(false);
  const user = useRecoilValue(userState);

  const { mutate, isLoading } = useDeleteComment();

  const onDeleteCmt = () => {
    mutate({
      comment_id,
      post_id,
    });
  };

  const onEditCmt = () => {
    setIsEditCmt(!isEditCmt);
  };

  return (
    <div
      className='comment-custom'
      onMouseOut={() => setShowOptionMessage(true)}
      onMouseLeave={() => setShowOptionMessage(false)}
    >
      <Comment
        actions={[
          <span
            key='comment-nested-reply-to'
            onClick={() => onShowAddCmt(!isShowAddCmt)}
          >
            Reply
          </span>,
        ]}
        author={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link
              to={`/profile/${uid}`}
              style={{
                textDecoration: 'none',
                color: '#1a3353',
                fontWeight: '500',
              }}
            >
              {fullName}
            </Link>

            {uid === user.uid && (
              <div
                style={{ visibility: showOptionMessage ? 'unset' : 'hidden' }}
              >
                <Popover
                  trigger={'click'}
                  content={() => {
                    return (
                      <div>
                        <Button danger onClick={onDeleteCmt}>
                          Delete
                        </Button>
                        <Button
                          size='small'
                          style={{
                            marginLeft: '5px',
                            borderColor: 'var(--bs-warning)',
                            color: 'var(--bs-warning)',
                          }}
                          onClick={onEditCmt}
                        >
                          Edit
                        </Button>
                      </div>
                    );
                  }}
                >
                  <BiDotsVerticalRounded />
                </Popover>
              </div>
            )}
          </div>
        }
        avatar={
          <AvatarCustom
            showPopover={true}
            srcAvatar={srcAvatar}
            uid={uid}
            size={32}
            fullName={fullName}
            bio={bio}
            address={address}
          />
        }
        content={
          isEditCmt ? (
            <AddComment
              post_id={post_id}
              contentValue={content}
              isShowAvatar={false}
              type='edit'
              commentId={comment_id}
              rep={repId}
              setIsEditCmt={setIsEditCmt}
            />
          ) : (
            <p
              style={{
                background: '#F0F2F5',
                borderRadius: '10px',
                padding: '0.25rem 1rem',
                color: '#000',
              }}
            >
              {content}
            </p>
          )
        }
        children={chirld && chirld}
      />
    </div>
  );
};
