import { CommentCustom } from "./CommentCustom";
import { CommentResponse } from "..";

interface CommentsProps {
  data: CommentResponse[];
}
export const CommentCustoms = (props: CommentsProps) => {
  const { data } = props;

  return (
    <>
      {data.map((item, key) => {
        return <CommentCustom data={item} key={key} />;
      })}
    </>
  );
};
