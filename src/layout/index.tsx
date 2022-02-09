import React from 'react';

interface LayoutProps {
  SideBarLeft?: React.FC;
  SideBarRight?: React.FC;
}
export const Layout = (props: LayoutProps) => {
  const { SideBarLeft, SideBarRight } = props;
  return <div className='layout'>{SideBarRight && <SideBarRight />}</div>;
};
