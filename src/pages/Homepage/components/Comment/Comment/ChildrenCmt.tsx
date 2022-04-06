import React, { useState } from "react";
import { Button, Comment, Popover } from "antd";
import { AvatarCustom, AvatarCustomProps } from "components/Avatar";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useRecoilValue } from "recoil";
import { userState } from "recoil/users/state";
import { Link } from "react-router-dom";
import { useDeleteComment } from "hooks/comment";

interface ChirldCmtProps {
  onShowAddCmt: (value: boolean) => void;
  isShowAddCmt: boolean;
  content: string;
  comment_id:number,
  post_id:number,
  avatar: AvatarCustomProps;
}

export const ChirldCmt = (props: ChirldCmtProps) => {
  const { onShowAddCmt, isShowAddCmt, content, avatar, comment_id,post_id  } = props;
  const { srcAvatar, uid, fullName, bio, address } = avatar;
  const [showOptionMessage, setShowOptionMessage] = useState(false);
  const user = useRecoilValue(userState);

  const { mutate, isLoading } = useDeleteComment();

  const onDeleteCmt = () => {
    mutate({
      comment_id,
      post_id,
    });
  };

  return (
    <div
      onMouseOut={() => setShowOptionMessage(true)}
      onMouseLeave={() => setShowOptionMessage(false)}
    >
      <Comment
        actions={[
          <span
            key="comment-nested-reply-to"
            onClick={() => onShowAddCmt(!isShowAddCmt)}
          >
            Reply to
          </span>,
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
              style={{ textDecoration: "none", color: "black" }}
            >
              {fullName}
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
                        <Button danger onClick={onDeleteCmt}>Delete</Button>
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
          <p
            style={{
              background: "#F0F2F5",
              borderRadius: "10px",
              padding: "3px",
            }}
          >
            {content}
          </p>
        }
      ></Comment>
    </div>
  );
};
