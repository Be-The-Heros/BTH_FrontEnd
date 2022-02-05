import React from "react";
import { Header } from "../components/Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="layout">
      <Header />
    </div>
  );
};
