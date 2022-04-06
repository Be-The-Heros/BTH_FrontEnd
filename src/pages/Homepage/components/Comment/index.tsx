import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AddComment } from "./AddComment";
import { CommentCustoms } from "./Comment";
import { useRecoilState, useRecoilValue } from "recoil";
import { cmtPushSubState } from "recoil/comments/state";
import { useLoadComment } from "hooks/comment";

interface BoxCommentProps {
  postId: number;
}

export interface ProfileCustom {
  uid: string;
  first_name?: string;
  last_name?: string;
  status?: string;
  avatar: string;
  address?: string;
  bio?: string;
}

export interface CommentResponse {
  post_id: number;
  content?: string;
  rep?: number;
  img?: string;
  comment_id: number;
  uid: string;
  created_at?: Date;
  updated_at?: Date;
  profile: ProfileCustom;
  commentReps?: CommentResponse[];
}

//... [{key:121}]

export const BoxComment = (props: BoxCommentProps) => {
  const { postId } = props;
  const subComment = useRecoilValue(cmtPushSubState);

  const [dataListComment, setDataListComment] = useState<CommentResponse[]>([]);

  const { isLoading, error, data } = useLoadComment(postId);
  useEffect(() => {
    if (
      subComment.content &&
      subComment.postId &&
      subComment.postId === postId
    ) {
      if (subComment.type === "add") {
        const newData = [...dataListComment];
        const newComment = {
          comment_id: subComment.comment_id,
          content: subComment.content,
          rep: subComment.rep,
          uid: subComment.uid,
          profile: subComment.profile,
          post_id: subComment.postId,
        };
        if (subComment.rep) {
          const index = newData.findIndex(
            (item) => item.comment_id === subComment.rep && item.commentReps
          );
          index != -1 &&
            (newData[index].commentReps = [
              ...(newData[index].commentReps || []),
              newComment,
            ]);
        } else {
          newData.push(newComment);
        }
        setDataListComment(newData);
      } else {
        console.log("remove ne");

        const newData = [...dataListComment];

        if (subComment.rep) {
          const index = newData.findIndex(
            (item) => item.comment_id === subComment.rep && item.commentReps
          );

          index != -1 &&
            (newData[index].commentReps = [
              ...(newData[index].commentReps || []).filter(
                (item) => item.comment_id !== subComment.comment_id
              ),
            ]);
            setDataListComment(newData);
        } else {
          const tmp = newData.filter(
            (item) => item.comment_id !== subComment.comment_id
          );
          setDataListComment(tmp);
        }
      }
    }
  }, [subComment.comment_id, subComment.content, subComment.postId]);

  useEffect(() => {
    if (!error && data) {
      setDataListComment(data);
    }
  }, [isLoading, error, data]);

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            paddingTop: "10px",
          }}
        >
          <Skeleton avatar paragraph={{ rows: 1 }} />
        </div>
      ) : (
        <>
          <AddComment post_id={postId} />
          <CommentCustoms data={dataListComment} />
        </>
      )}
    </div>
  );
};
