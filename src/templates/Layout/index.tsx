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
<<<<<<< HEAD
      <Footer />
    </div>
=======
    </Style>
>>>>>>> ee4bad16762c5fa10692d94681a0eee6571e46fe
  );
};

export default LayoutMain;
