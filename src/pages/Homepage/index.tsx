import Loading from 'components/Loading';
import { useQueryListPost } from 'hooks/post/list';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LayoutApp } from 'templates/LayoutApp';
import { NewFeed } from './components/NewFeed';
import { SidebarLeft } from './components/SidebarLeft';
import { SidebarRight } from './components/SidebarRight';
import _toNumber from 'lodash/toNumber';
import Style from './style';
import { toString } from 'lodash';

const TIME_OUT_FETCH = 2000;

const Homepage = () => {
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
  React.useEffect(() => {
    if (postQuery.data && isHasMore) {
      setDataRender([...dataRender, ...(postQuery.data?.data.list || [])]);
    }
    if (
      postQuery.data &&
      postQuery.data?.data.total <= pagination.page * pagination.size
    ) {
      setIsHasMore(false);
      return;
    }
    setIsHasMore(true);
  }, [pagination.page, postQuery.data?.data.list]);

  return (
    <LayoutApp sidebarLeft={<SidebarLeft />} sidebarRight={<SidebarRight />}>
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
    </LayoutApp>
  );
};
export default Homepage;
