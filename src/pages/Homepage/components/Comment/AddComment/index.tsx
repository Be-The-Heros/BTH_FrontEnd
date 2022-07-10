import { Button, Comment, Form, Input, Tooltip } from "antd";
import { AvatarCustom } from "components/Avatar";
import { useCreateComment, useEditComment } from "hooks/comment";
import React, { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { cmtPushSubState } from "recoil/comments/state";
import { userState } from "recoil/users/state";

const { TextArea } = Input;

interface IAddComment {
  post_id: number;
  rep?: number;
  commentId?: number;
  contentValue?: string;
  type: "edit" | "create";
  defaultValue?: string;
  isShowAvatar: boolean;
  setIsEditCmt?: (value: boolean) => void;
  isVerified?: boolean;
}

export const AddComment = (props: IAddComment) => {
  const {
    post_id: postId,
    rep,
    contentValue,
    isShowAvatar,
    type,
    commentId,
    setIsEditCmt,
    defaultValue,
    isVerified,
  } = props;
  const infoUser = useRecoilValue(userState);
  const [content, setContent] = useState("");
  const subComment = useRecoilValue(cmtPushSubState);

  const { mutate, isLoading } = useCreateComment();

  const { mutate: mutateEdit, isLoading: isLoadingEdit } = useEditComment();

  useEffect(() => {
    if (subComment.uid) {
      setContent("");
    }
  }, [subComment]);

  useEffect(() => {
    if (contentValue) {
      setContent(contentValue);
    }
  }, [contentValue, commentId]);

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onCreateComment = () => {
    if (type === "create") {
      if (content.length > 0) {
        mutate({
          content,
          post_id: postId,
          rep,
        });
      }
    } else {
      if (commentId) {
        mutateEdit({
          comment_id: commentId,
          content,
          post_id: postId,
        });
      }
      setIsEditCmt && setIsEditCmt(false);
      // console.log(contentValue, commentId, postId);
    }
  };

  return (
    <div>
      {infoUser.uid && (
        <Comment
          style={{ padding: "10px 0", paddingBottom: 0 }}
          avatar={
            isShowAvatar && (
              <AvatarCustom
                showPopover={false}
                srcAvatar={infoUser.avatar || ""}
                uid={infoUser.uid}
                size={32}
                fullName={infoUser.first_name + " " + infoUser.last_name}
                isVerified={Boolean(isVerified)}
              />
            )
          }
          content={
            <React.Fragment>
              <Form.Item style={{ marginBottom: "5px" }}>
                <TextArea
                  onChange={(e) => onChangeContent(e)}
                  value={content}
                  autoSize
                />

                {type === "create" && (
                  <Tooltip title="Choose imge">
                    <>
                      <label
                        htmlFor="file-upload"
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <AiOutlineCamera size={20} />
                      </label>
                      <input
                        accept="image/png, image/jpeg"
                        id="file-upload"
                        style={{ display: "none" }}
                        type="file"
                      />
                    </>
                  </Tooltip>
                )}
              </Form.Item>
              <Form.Item style={{ marginBottom: "5px" }}>
                <Button
                  loading={isLoading}
                  onClick={onCreateComment}
                  style={{
                    background: "#7cdfff",
                    border: "none",
                    color: "var(--bs-gray-dark)",
                  }}
                  htmlType="submit"
                  type="primary"
                  disabled={isLoading || content.trim().length === 0}
                >
                  {type === "create" ? "Comment" : "Save"}
                </Button>
              </Form.Item>
            </React.Fragment>
          }
        />
      )}
    </div>
  );
};
