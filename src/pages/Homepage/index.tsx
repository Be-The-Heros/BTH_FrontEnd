import { useQueryListPost } from 'hooks/post/list';
import Post from 'pages/Post';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRecoilState, useRecoilValue } from 'recoil';
import { postState } from 'recoil/posts/state';
import { LayoutApp } from 'templates/LayoutApp';
import { SidebarRight } from './components';
import { NewFeed } from './components/NewFeed';
import { SidebarLeft } from './components/SidebarLeft';
import Style from './style';

const Homepage = () => {
  const [postsState, setPosts] = useRecoilState(postState);

  const postQuery = useQueryListPost();
  console.log('postQuery', postQuery.data);

  const fetchMoreData = () => {
    setTimeout(() => {
      setPosts([...postsState, ...postsState]);
    }, 1000);
  };
  return (
    <LayoutApp sidebarLeft={<SidebarLeft />} sidebarRight={<SidebarRight />}>
      <Style>
        <InfiniteScroll
          loader={<h4>Loading...</h4>}
          next={fetchMoreData}
          hasMore={true}
          dataLength={postsState.length}
        >
          {postsState.map((post, index) => {
            return <NewFeed {...post} key={index} />;
          })}
        </InfiniteScroll>
      </Style>
    </LayoutApp>
  );
};
export default Homepage;
