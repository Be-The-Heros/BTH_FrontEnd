import React from 'react';
import { LayoutApp } from 'templates/LayoutApp';
import { SidebarLeft } from 'pages/Home/components/SidebarLeft';
import { SidebarRight } from './components/SidebarRight';

const Homepage = () => {
  return (
    <LayoutApp sidebarLeft={<SidebarLeft />} sidebarRight={<SidebarRight />}>
      Homepage
    </LayoutApp>
  );
};
export default Homepage;
