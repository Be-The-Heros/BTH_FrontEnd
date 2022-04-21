import Loading from 'components/Loading';
import { useQueryListPost } from 'hooks/post/list';
import { toString } from 'lodash';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import { LayoutApp } from 'templates/LayoutApp';
import { NewFeed } from 'pages/Homepage/components/NewFeed';
import Style from './style';

const TIME_OUT_FETCH = 2000;

const Posts = () => {
  const [pagination, setPagination] = React.useState({
    page: 1,
    size: 8,
  });

  const [dataRender, setDataRender] = React.useState<PostInfo[]>([]);
  const postQuery = useQueryListPost({ ...pagination });
  const [isHasMore, setIsHasMore] = React.useState(true);

  const handleDeletePost = (id: string) => {
    setDataRender(dataRender.filter((item) => toString(item.post_id) !== id));
  };

  // React.useEffect(() => {
  //   postQuery.refetch();
  // }, []);
  React.useEffect(() => {
    toast.dismiss();
    if (postQuery.data && isHasMore) {
      setDataRender([...dataRender, ...(postQuery.data?.list || [])]);
    }
    if (
      postQuery.data &&
      postQuery.data?.total <= pagination.page * pagination.size
    ) {
      setIsHasMore(false);
      return;
    }
    setIsHasMore(true);
  }, [pagination.page, postQuery.data?.list]);

  return (
      <Style>
        <InfiniteScroll
          loader={<Loading />}
          next={() =>
            setTimeout(() => {
              setPagination((pagination) => ({
                ...pagination,
                page: pagination.page + 1,
              }));
            }, TIME_OUT_FETCH)
          }
          hasMore={isHasMore}
          pullDownToRefresh={true}
          refreshFunction={postQuery.refetch}
          dataLength={dataRender.length}
        >
          {dataRender.map((post, index) => {
            return (
              <NewFeed
                {...post}
                key={index}
                handleDeletePost={handleDeletePost}
              />
            );
          })}
        </InfiniteScroll>
      </Style>
  );
};
export default Posts;
