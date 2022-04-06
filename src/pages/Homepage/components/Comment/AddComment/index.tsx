import { Button, Comment, Form, Input } from "antd";
import { AvatarCustom } from "components/Avatar";
import { useCreateComment } from "hooks/comment";
import React from "react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { cmtPushSubState } from "recoil/comments/state";
import { userState } from "recoil/users/state";

const { TextArea } = Input;

interface AddCommentProps {
  postId: number;
  rep?: number;
}

export const AddComment = (props: AddCommentProps) => {
  const { postId, rep } = props;
  const infoUser = useRecoilValue(userState);
  const [content, setContent] = useState("");
  const subState = useRecoilValue(cmtPushSubState);

  const { mutate, isLoading } = useCreateComment();

  useEffect(() => {
    if (subState.uid) {
      setContent("");
    }
  }, [subState]);

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement> ) => {
    if (e.target.value.length > 0) {
      setContent(e.target.value);
    }
  };

  const onCreateComment = () => {
    if (content.length > 0) {
      mutate({
        content,
        postId,
        rep,
        token: infoUser.token,
      });
    }
  };

  return (
    <div>
      {infoUser.uid && (
        <Comment
          style={{ padding: "10px 0" }}
          avatar={
            <AvatarCustom
              showPopover={false}
              srcAvatar={infoUser.avatar || ""}
              uid={infoUser.uid}
              size={32}
              fullName={infoUser.first_name + " " + infoUser.last_name}
            />
          }
          content={
            <React.Fragment>
              <Form.Item style={{ marginBottom: "5px" }}>
                <TextArea onChange={(e)=>onChangeContent(e)} value={content} />
              </Form.Item>
              <Form.Item style={{ marginBottom: "5px" }}>
                <Button
                  loading={isLoading}
                  onClick={onCreateComment}
                  style={{ background: "#7cdfff", border: "none" }}
                  htmlType="submit"
                  type="primary"
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
