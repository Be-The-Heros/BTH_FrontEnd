import React from "react";
import { Layout } from "antd";

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}
export const LayoutCustom = (props: LayoutProps) => {
  const { children, sidebar } = props;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {sidebar}
      <Layout>{children}</Layout>
    </Layout>
  );
};
