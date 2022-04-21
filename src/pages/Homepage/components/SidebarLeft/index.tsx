import React from "react";
import Style from "./style";
import {
  FcAbout,
  FcDocument,
  FcHome,
  FcOrganization,
  FcViewDetails,
} from "react-icons/fc";
import { Link } from "react-router-dom";
export const SidebarLeft = () => {
  return (
    <Style>
      <div>
        <div className="div_left_side_bar">
          <Link to="/" className="home">
            <FcHome
              style={{
                fontSize: "2rem",
                marginTop: "-5px",
                marginRight: "10px",
              }}
            ></FcHome>
            Home
          </Link>
        </div>
        <div className="div_left_side_bar">
          <Link to="/">
            <FcOrganization
              style={{
                fontSize: "2rem",
                marginTop: "-5px",
                marginRight: "10px",
              }}
            />
            Organization
          </Link>
        </div>
        <div className="div_left_side_bar">
          <Link to="/">
            <FcAbout style={{ fontSize: "2rem", marginRight: "10px" }} /> About
          </Link>
        </div>
      </div>
      <div>
        <h4>Other</h4>
        <div className="div_left_side_bar">
          <Link to="">
            <FcViewDetails style={{ fontSize: "2rem", marginRight: "10px" }} />{" "}
            Privacy policy
          </Link>
        </div>
        <div className="div_left_side_bar">
          <Link to="/">
            <FcDocument style={{ fontSize: "2rem", marginRight: "10px" }} />{" "}
            Term of use
          </Link>
        </div>
      </div>
    </Style>
  );
};
