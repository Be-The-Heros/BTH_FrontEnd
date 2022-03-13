import { Header } from "components/Header";
import React from "react";
import { Outlet } from "react-router";

interface LayoutMainProps {
  sidebarLeft?: React.ReactNode;
  sidebarRight?: React.ReactNode;
  children?: React.ReactNode;
}

const LayoutMain: React.FC<LayoutMainProps> = () => {
  return (
    <div className="main">
      <Header />
      <Outlet />
    </div>
  );
};

export default LayoutMain;
