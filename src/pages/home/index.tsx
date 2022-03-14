import React, { useEffect } from 'react';
import { LayoutApp } from 'templates/LayoutApp';
import { SidebarLeft, SidebarRight } from './components';
const Homepage = () => {
  return (
    <LayoutApp
      sidebarLeft={<SidebarLeft />}
      sidebarRight={<SidebarRight />}
    ></LayoutApp>
  );
};
export default Homepage;
