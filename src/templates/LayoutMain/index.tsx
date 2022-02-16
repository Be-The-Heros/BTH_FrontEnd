import { Header } from 'components/Header';
import React from 'react';
import Style from './style';

interface LayoutMainProps {
  sidebarLeft?: React.ReactNode;
  sidebarRight?: React.ReactNode;
  children?: React.ReactNode;
}

const LayoutMain: React.FC<LayoutMainProps> = ({
  sidebarLeft,
  sidebarRight,
  children,
}) => {
  return (
    <React.Fragment>
      <Header />

      <Style>
        {sidebarLeft && <div className='sidebar-left'>{sidebarLeft}</div>}
        <div className='main-content'>{children}</div>
        {sidebarRight && <div className='sidebar-right'>{sidebarRight}</div>}
      </Style>
    </React.Fragment>
  );
};

export default LayoutMain;
