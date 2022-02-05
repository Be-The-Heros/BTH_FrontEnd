import React from "react";
import Style from "./style";
import logo from "assets/images/logo.svg";
export const Header = () => {
  return (
    <Style className="header d-flex justify-content-center">
      <div className="col-6">
        <div className="header__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="header__search"></div>
      </div>
      <div className="col-6"></div>
    </Style>
  );
};
