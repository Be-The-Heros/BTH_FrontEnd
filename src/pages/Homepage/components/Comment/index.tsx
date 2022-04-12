import { Skeleton } from "antd";
import { useLoadComment } from "hooks/comment";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { cmtPushSubState } from "recoil/comments/state";
import { AddComment } from "./AddComment";
import { CommentCustoms } from "./Comment";

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

      console.log('subComment.type',subComment.type);
      
      switch (subComment.type) {
        case "add":
          {
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
              index !== -1 &&
                (newData[index].commentReps = [
                  ...(newData[index].commentReps || []),
                  newComment,
                ]);
            } else {
              newData.push(newComment);
            }
            setDataListComment(newData);
          }

          break;
        case "remove":
          {

            console.log('ahihi remove ',subComment);
            
            const newData = [...dataListComment];

            if (subComment.rep) {
              const index = newData.findIndex(
                (item) => item.comment_id === subComment.rep && item.commentReps
              );

              index !== -1 &&
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

          break;

        case "edit":
          {
            const newData = [...dataListComment];

            if (subComment.rep) {
              const index = newData.findIndex(
                (item) => item.comment_id === subComment.rep && item.commentReps
              );

              if (index !== -1) {
                const indexCommentRep = (
                  newData[index].commentReps || []
                ).findIndex((e) => {
                  return e.comment_id === subComment.comment_id;
                });

                if (newData[index].commentReps && indexCommentRep !== -1) {
                  const tmp = newData[index].commentReps;

                  if (tmp && tmp[indexCommentRep]) {
                    tmp[indexCommentRep].content = subComment.content;
                  }
                }
              }

              setDataListComment(newData);
            } else {
              const indexCmt = newData.findIndex(
                (item) => item.comment_id === subComment.comment_id
              );

              newData[indexCmt].content = subComment.content;

              setDataListComment(newData);
            }
          }
          break;

        default:
          break;
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
          <AddComment post_id={postId} isShowAvatar type="create" />
          <CommentCustoms data={dataListComment} />
        </>
      )}
    </div>
  );
};
