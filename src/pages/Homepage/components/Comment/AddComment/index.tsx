import { Button, Comment, Form, Input } from 'antd';
import { AvatarCustom } from 'components/Avatar';
import { useCreateComment } from 'hooks/comment';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { cmtPushSubState } from 'recoil/comments/state';
import { userState } from 'recoil/users/state';

const { TextArea } = Input;

export const AddComment = (props: Omit<createCmtProps, 'content'>) => {
  const { post_id: postId, rep } = props;
  const infoUser = useRecoilValue(userState);
  const [content, setContent] = useState('');
  const subComment = useRecoilValue(cmtPushSubState);

  const { mutate, isLoading } = useCreateComment();

  useEffect(() => {
    if (subComment.uid) {
      setContent('');
    }
  }, [subComment]);

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onCreateComment = () => {
    if (content.length > 0) {
      mutate({
        content,
        post_id: postId,
        rep,
      });
    }
  };

  return (
    <div>
      {infoUser.uid && (
        <Comment
          style={{ padding: '10px 0' }}
          avatar={
            <AvatarCustom
              showPopover={false}
              srcAvatar={infoUser.avatar || ''}
              uid={infoUser.uid}
              size={32}
              fullName={infoUser.first_name + ' ' + infoUser.last_name}
            />
          }
          content={
            <React.Fragment>
              <Form.Item style={{ marginBottom: '5px' }}>
                <TextArea
                  onChange={(e) => onChangeContent(e)}
                  value={content}
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: '5px' }}>
                <Button
                  loading={isLoading}
                  onClick={onCreateComment}
                  style={{ background: '#7cdfff', border: 'none' }}
                  htmlType='submit'
                  type='primary'
                >
                  Comment
                </Button>
              </Form.Item>
            </React.Fragment>
          }
        />
      )}
    </div>
  );
};
