import React, { useState } from "react";
import { Button, Comment, Popover, Row } from "antd";
import { AvatarCustom } from "components/Avatar";
import { AddComment } from "../AddComment";
import { ChirldCmt } from "./ChildrenCmt";
import { CommentResponse } from "..";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useRecoilValue } from "recoil";
import { userState } from "recoil/users/state";
import { Link } from "react-router-dom";
import { useDeleteComment } from "hooks/comment";

interface CommentCustomProps {
  data: CommentResponse;
}

export const CommentCustom = (props: CommentCustomProps) => {
  const { data } = props;
  const { profile, content, commentReps, post_id, comment_id, uid } = data;
  const [showAddCmt, setShowAddCmt] = useState(false);
  const [showOptionMessage, setShowOptionMessage] = useState(false);
  const user = useRecoilValue(userState);

  const { mutate, isLoading } = useDeleteComment();

  const onDeleteCmt = () => {
    mutate({
      comment_id,
      post_id,
    });
  };

  const listChildren = () => {
    return (
      <>
        {(commentReps || []).map((item, key) => {
          const { profile, content,comment_id } = item;
          return (
            <ChirldCmt
              key={key}
              post_id={post_id}
              comment_id={comment_id}
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
    <div
      className="comment-custom"
      onMouseOut={() => setShowOptionMessage(true)}
      onMouseLeave={() => setShowOptionMessage(false)}
    >
      <Comment
        actions={[
          <span
            key="comment-nested-reply-to"
            onClick={() => setShowAddCmt(!showAddCmt)}
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
              {profile?.first_name || "" + profile?.last_name || ""}
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
