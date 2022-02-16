import React from 'react';
import Style from './style';

interface LayoutMainProps {
  sidebarLeft?: React.ReactNode;
  sidebarRight?: React.ReactNode;
  children?: React.ReactNode;
}
export const LayoutApp: React.FC<LayoutMainProps> = ({
  sidebarLeft,
  sidebarRight,
  children,
}) => {
  return (
    <Style>
      {sidebarLeft && <div className='sidebar-left'>{sidebarLeft}</div>}
      <div className='main-content'>{children}</div>
      {sidebarRight && <div className='sidebar-right'>{sidebarRight}</div>}
    </Style>
  );
};
