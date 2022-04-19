import { useState } from 'react';
import { CommentResponse } from '..';
import { AddComment } from '../AddComment';
import { ChirldCmt } from './ChildrenCmt';

interface CommentCustomProps {
  data: CommentResponse;
}

export const CommentCustom = (props: CommentCustomProps) => {
  const { data } = props;
  const { profile, content, commentReps, post_id, comment_id } = data;
  const [showAddCmt, setShowAddCmt] = useState(false);

  const listChildren = () => {
    return (
      <>
        {(commentReps || []).map((item, key) => {
          const { profile, content, comment_id } = item;
          return (
            <ChirldCmt
              key={key}
              post_id={post_id}
              comment_id={comment_id}
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
          />
        )}
      </>
    );
  };
  return (
    <ChirldCmt
      post_id={post_id}
      comment_id={comment_id}
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
      chirld={listChildren()}
    />
  );
};
