import { Header } from 'components/Header';
import React from 'react';
import { Outlet } from 'react-router';
import Style from './style';

const LayoutMain = () => {
  return (
    <Style className='main'>
      <Header />
      <div className='td-layout'>
        <Outlet />
      </div>
    </Style>
  );
};

export default LayoutMain;
