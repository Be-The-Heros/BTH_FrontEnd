import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AddComment } from "./AddComment";
import { CommentCustoms } from "./Comment";
import { useRecoilState } from "recoil";
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
  const [sub] = useRecoilState(cmtPushSubState);

  const [dataListComment, setDataListComment] = useState<CommentResponse[]>([]);

  const { isLoading, error, data } = useLoadComment(postId);
  useEffect(() => {
    if (sub.content && sub.postId && sub.postId === postId) {
      const newData = [...dataListComment];
      const newComment = {
            comment_id: sub.comment_id,
            content: sub.content,
            rep: sub.rep,
            uid: sub.uid,
            profile: sub.profile,
            post_id: sub.postId,
          }
      if (sub.rep) {
        const index = newData.findIndex((item) => item.comment_id === sub.rep && item.commentReps);
        index != -1 && (newData[index].commentReps = [...newData[index].commentReps || [], newComment]);
      } else {
        newData.push(newComment);
      }
      setDataListComment(newData);

    }
  }, [sub.content, sub.postId]);

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
