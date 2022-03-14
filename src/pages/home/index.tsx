import React from 'react';
import { LayoutApp } from 'templates/LayoutApp';
import { SidebarLeft } from 'pages/home/components/SidebarLeft';
import { SidebarRight } from 'pages/home/components/SidebarRight';
import {NewFeed}  from 'pages/home/components/NewFeed';

import {Post} from 'recoil/users/types';
import Style from './style';

const post: Post = { 
  id_post: '001',
  uid: '001',
  create_at: "18/2/2022",
  photos : ['https://iweb.tatthanh.com.vn/pic/8/news/images/cac-hoat-dong-thien-nguyen-chao-xuan-moi-ky-hoi.jpg'],
  residential_address: '30 Tran Phu',
  district :'Hai Chau 1',
  ward : 'Hai Chau',
  province : "Da Nang",

} ;
const Homepage = () => {

  return (
    <LayoutApp sidebarLeft={<SidebarLeft />} sidebarRight={<SidebarRight />}>
      <Style>
        <div className='header' >
            <a href='#'>Newest</a>
            <a href='#'>Nearest</a>
            <a href='#'>More joined</a>
        </div>
        <NewFeed {...post }/>
      </Style>
    </LayoutApp>
  );
};
export default Homepage;
