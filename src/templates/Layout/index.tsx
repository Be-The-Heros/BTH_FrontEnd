import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
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
      <Footer />
    </Style>
  );
};

export default LayoutMain;
