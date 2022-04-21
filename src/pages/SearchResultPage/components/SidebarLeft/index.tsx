import React from "react";
import Style from "./style";
import { HiUsers } from "react-icons/hi";
import { ImNewspaper } from "react-icons/im";
import { AiFillFileText } from "react-icons/ai";
import { Link } from "react-router-dom";
export const SidebarLeft = () => {
  return (
    <Style>
      <div>
        <div
          style={{
            marginLeft: "1.7em",
          }}
        >
          <p
            style={{
              color: "black",
              fontSize: "1.5rem",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            Search results
          </p>

          <hr />
          <p
            style={{
              color: "black",
              margin: 0,
              fontSize: "1rem",
            }}
          >
            Filter
          </p>
        </div>
        <div className="div_all">
          <Link to="/">
            <ImNewspaper
              style={{
                fontSize: "2rem",
                marginTop: "-5px",
                marginRight: "10px",
                color: "#358de4",
              }}
            ></ImNewspaper>
            All
          </Link>
        </div>
        <div className="div_posts">
          <Link to="/">
            <AiFillFileText
              style={{
                fontSize: "2rem",
                marginTop: "-5px",
                marginRight: "10px",
                color: "#358de4",
              }}
            />
            Posts
          </Link>
        </div>
        <div className="div_users">
          <Link to="/">
            <HiUsers
              style={{
                fontSize: "2rem",
                marginRight: "10px",
                color: "#358de4",
              }}
            />
            User
          </Link>
        </div>
      </div>
    </Style>
  );
};
