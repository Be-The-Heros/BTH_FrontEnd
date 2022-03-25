import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRecoilState } from 'recoil';
import { LayoutApp } from 'templates/LayoutApp';
import { NewFeed } from './components/NewFeed';
import { SidebarLeft } from './components/SidebarLeft';
import { SidebarRight } from './components/SidebarRight';
import Style from './style';

const Homepage = () => {
  return (
    <LayoutApp sidebarLeft={<SidebarLeft />} sidebarRight={<SidebarRight />}>
      <Style>
        {/* <InfiniteScroll
          loader={<h4>Loading...</h4>}
          next={fetchMoreData}
          hasMore={true}
          dataLength={postsState.length}
        >
          {postsState.map((post, index) => {
            return <NewFeed {...post} key={index} />;
          })}
        </InfiniteScroll> */}
      </Style>
    </LayoutApp>
  );
};
export default Homepage;
