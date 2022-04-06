import React from "react";
import { Comment } from "antd";
import { AvatarCustom, AvatarCustomProps } from "components/Avatar";

interface ChirldCmtProps {
  onShowAddCmt: (value: boolean) => void;
  isShowAddCmt: boolean;
  content: string;
  avatar: AvatarCustomProps;
}

export const ChirldCmt = (props: ChirldCmtProps) => {
  const { onShowAddCmt, isShowAddCmt, content, avatar } = props;

  const { srcAvatar, uid, fullName, bio, address } = avatar;

  return (
    <>
      <Comment
        actions={[
          <span
            key="comment-nested-reply-to"
            onClick={() => onShowAddCmt(!isShowAddCmt)}
          >
            Reply to
          </span>,
        ]}
        author={<a>{fullName}</a>}
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
    </>
  );
};
