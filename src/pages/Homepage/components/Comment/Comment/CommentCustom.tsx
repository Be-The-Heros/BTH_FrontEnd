import React, { useState } from "react";
import { Comment } from "antd";
import { AvatarCustom } from "components/Avatar";
import { AddComment } from "../AddComment";
import { ChirldCmt } from "./ChildrenCmt";
import { CommentResponse } from "..";

interface CommentCustomProps {
  data: CommentResponse;
}

export const CommentCustom = (props: CommentCustomProps) => {
  const { data } = props;
  const { profile, content, commentReps, post_id , comment_id } = data;
  const [showAddCmt, setShowAddCmt] = useState(false);

  
  const listChildren = () => {
    return (
      <>
        {(commentReps || []).map((item, key) => {
          const { profile, content } = item;
          return (
            <ChirldCmt
              key={key}
              avatar={{
                showPopover: true,
                srcAvatar: profile.avatar,
                uid: profile.uid,
                fullName: profile.first_name + " " + profile.last_name,
                bio: profile.bio,
                address: profile.address,
              }}
              content={content || ""}
              isShowAddCmt={showAddCmt}
              onShowAddCmt={setShowAddCmt}
            />
          );
        })}

        {showAddCmt && <AddComment post_id={+post_id} rep={comment_id} />}
      </>
    );
  };
  return (
    <div className="comment-custom">
      <Comment
        actions={[
          <span
            key="comment-nested-reply-to"
            onClick={() => setShowAddCmt(!showAddCmt)}
          >
            Reply to
          </span>,
        ]}
        author={<a>{profile?.first_name || "" + profile?.last_name || ""}</a>}
        avatar={
          <AvatarCustom
            showPopover={true}
            srcAvatar={profile.avatar}
            uid={profile.uid}
            fullName={profile.first_name + " " + profile.last_name}
            bio={profile.bio}
            address={profile.address}
            size={32}
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
        children={listChildren()}
      />
    </div>
  );
};
