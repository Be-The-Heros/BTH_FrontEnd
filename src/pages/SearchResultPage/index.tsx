import React from 'react';
import { toast } from 'react-toastify';
import { LayoutApp } from 'templates/LayoutApp';
import { Users } from './components/Users';
import { SidebarLeft } from './components/SidebarLeft';
import { All } from './components/All';
import Main from './Main';

//import Style from './style';

const SearchResultPage = () => {
  return (
    <LayoutApp sidebarLeft={<SidebarLeft />} >
        <Main></Main>
   </LayoutApp>

  );
};
export default SearchResultPage;
