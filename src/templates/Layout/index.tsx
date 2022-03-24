import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import React from 'react';
import { Outlet } from 'react-router';

interface LayoutMainProps {
  sidebarLeft?: React.ReactNode;
  sidebarRight?: React.ReactNode;
  children?: React.ReactNode;
}

const LayoutMain: React.FC<LayoutMainProps> = () => {
  return (
    <div className='main'>
      <Header />
      <div className='td-layout'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutMain;
