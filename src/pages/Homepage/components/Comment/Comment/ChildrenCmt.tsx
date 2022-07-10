import { Button, Comment, Popover } from "antd";
import { AvatarCustom, AvatarCustomProps } from "components/Avatar";
import { useDeleteComment } from "hooks/comment";
import React, { ReactChild, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "recoil/users/state";
import { AddComment } from "../AddComment";
import { ImReply } from "react-icons/im";
import PopupLogin from "components/PopupSuggestLogin";
import { FcOk } from "react-icons/fc";

interface ChirldCmtProps {
  onShowAddCmt: (value: boolean) => void;
  isShowAddCmt: boolean;
  content: string;
  comment_id: number;
  post_id: number;
  avatar: AvatarCustomProps;
  repId?: number;
  child?: ReactChild;
  total: number;
  isChild?: boolean;
}

export const ChildrenCmt = (props: ChirldCmtProps) => {
  const {
    onShowAddCmt,
    isShowAddCmt,
    content,
    avatar,
    comment_id,
    post_id,
    child,
    repId,
    total,
    isChild,
  } = props;
  const { srcAvatar, uid, fullName, bio, address, isVerified } = avatar;

  const [showOptionMessage, setShowOptionMessage] = useState(false);
  const [isEditCmt, setIsEditCmt] = useState(false);
  const user = useRecoilValue(userState);
  const [isClickReply, setIsClickReply] = useState(false);
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
      className="comment-custom"
      onMouseOut={() => setShowOptionMessage(true)}
      onMouseLeave={() => setShowOptionMessage(false)}
    >
      <PopupLogin
        isOpen={isClickReply && !user.isLoggedIn}
        onClose={() => setIsClickReply(!isClickReply)}
      />
      <Comment
        actions={[
          <div
            key="comment-nested-reply-to d-flex align-items-center justify-content-center"
            onClick={() => {
              onShowAddCmt(!isShowAddCmt);
              setIsClickReply(!isClickReply);
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <ImReply
              style={{
                transform: "scale(-1,1)",
                marginRight: "5px",
              }}
            />
            {`${isChild || !total ? `Reply` : total + " replies"} `}
          </div>,
        ]}
        author={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              to={`/profile/${uid}`}
              style={{
                textDecoration: "none",
                color: "#1a3353",
                fontWeight: "500",
                fontSize: "1rem",
                marginTop: "0.25rem",
              }}
            >
              {fullName}
              {isVerified && (
                <FcOk
                  style={{
                    marginLeft: "0.25rem",
                  }}
                />
              )}
            </Link>

            {uid === user.uid && (
              <div
                style={{ visibility: showOptionMessage ? "unset" : "hidden" }}
              >
                <Popover
                  trigger={"click"}
                  content={() => {
                    return (
                      <div>
                        <Button danger onClick={onDeleteCmt}>
                          Delete
                        </Button>
                        <Button
                          size="small"
                          style={{
                            marginLeft: "5px",
                            borderColor: "var(--bs-warning)",
                            color: "var(--bs-warning)",
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
            isVerified={isVerified}
          />
        }
        content={
          isEditCmt ? (
            <AddComment
              post_id={post_id}
              contentValue={content}
              isShowAvatar={false}
              type="edit"
              commentId={comment_id}
              rep={repId}
              setIsEditCmt={setIsEditCmt}
            />
          ) : (
            <div
              style={{
                background: "#F0F2F5",
                borderRadius: "10px",
                padding: "0.35rem",
                color: "#000",
              }}
            >
              {content}
            </div>
          )
        }
        children={child}
      />
    </div>
  );
};
