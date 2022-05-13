import { LIMIT_COMMENT } from 'constants/show';
import { toNumber } from 'lodash';
import React, { useState } from 'react';
import { CommentResponse } from '..';
import { AddComment } from '../AddComment';
import { ChildrenCmt as ChildCmt } from './ChildrenCmt';
interface CommentCustomProps {
  data: CommentResponse;
}

export const CommentCustom = (props: CommentCustomProps) => {
  const { data } = props;
  const { profile, content, commentReps, post_id, comment_id } = data;
  const [showAddCmt, setShowAddCmt] = useState(false);
  const [isShowMoreBtn, setIsShowMore] = useState(true);

  React.useEffect(() => {
    if (commentReps && commentReps.length < LIMIT_COMMENT) {
      setIsShowMore(false);
    }
  }, []);

  const startIndex =
    isShowMoreBtn && toNumber(commentReps?.length) > LIMIT_COMMENT
      ? toNumber(commentReps?.length) - LIMIT_COMMENT
      : 0;

  const listChildren = () => {
    return (
      <React.Fragment>
        {isShowMoreBtn && commentReps && commentReps.length > LIMIT_COMMENT && (
          <div
            className='comment-more'
            onClick={() => setIsShowMore(false)}
            style={{
              cursor: 'pointer',
            }}
          >
            See all replies comments
          </div>
        )}
        {commentReps?.length &&
          commentReps
            .sort(
              (prev, next) =>
                new Date(prev.created_at || '').getTime() -
                new Date(next.created_at || '').getTime()
            )
            .slice(startIndex, commentReps?.length)

            .map((item, key) => {
              const { profile, content, comment_id } = item;
              return (
                <ChildCmt
                  key={key}
                  post_id={post_id}
                  comment_id={comment_id}
                  total={commentReps?.length || 0}
                  isChild={true}
                  avatar={{
                    showPopover: true,
                    srcAvatar: profile.avatar,
                    uid: profile.uid,
                    fullName: profile.first_name + ' ' + profile.last_name,
                    bio: profile.bio,
                    address: profile.address,
                  }}
                  content={content || ''}
                  isShowAddCmt={showAddCmt}
                  onShowAddCmt={setShowAddCmt}
                />
              );
            })}

        {showAddCmt && (
          <AddComment
            post_id={+post_id}
            rep={comment_id}
            isShowAvatar
            type='create'
            defaultValue={profile.first_name + ' ' + profile.last_name}
          />
        )}
      </React.Fragment>
    );
  };
  return (
    <ChildCmt
      post_id={post_id}
      comment_id={comment_id}
      total={commentReps?.length || 0}
      avatar={{
        showPopover: true,
        srcAvatar: profile.avatar,
        uid: profile.uid,
        fullName: profile.first_name + ' ' + profile.last_name,
        bio: profile.bio,
        address: profile.address,
      }}
      content={content || ''}
      isShowAddCmt={showAddCmt}
      onShowAddCmt={setShowAddCmt}
      child={listChildren()}
    />
  );
};
