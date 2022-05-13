import { CommentCustom } from './CommentCustom';
import { CommentResponse } from '..';
import React, { memo } from 'react';
import { LIMIT_COMMENT } from 'constants/show';

interface CommentsProps {
  data: CommentResponse[];
}

export default memo(function (props: CommentsProps) {
  const { data } = props;
  const [isShowMore, setIsShowMore] = React.useState(true);
  return (
    <React.Fragment>
      {data.length &&
        data
          .sort(
            (prev, next) =>
              new Date(next.created_at || '').getTime() -
              new Date(prev.created_at || '').getTime()
          )
          .slice(0, isShowMore ? LIMIT_COMMENT : data.length)
          .map((item, key) => {
            return <CommentCustom data={item} key={key} />;
          })}
      {isShowMore && data.length > LIMIT_COMMENT && (
        <div
          className='comment-more'
          onClick={() => setIsShowMore(false)}
          style={{
            cursor: 'pointer',
          }}
        >
          See all comments
        </div>
      )}
    </React.Fragment>
  );
});
