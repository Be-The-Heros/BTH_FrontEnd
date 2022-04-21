import React from "react";
import Style from "./style";
import { Users } from "../Users";
import Posts from "../Posts";
import Container from "./style";

export const All = () => {
  return (
    <Style>
      <Container>
        <div className="users_list">
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "black",
              marginBottom: 0,
            }}
          >
            Users
          </p>
          <Users />
        </div>
        <div className="posts_list">
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "black",
              marginBottom: 0,
            }}
          >
            Posts
          </p>
          <Posts />
        </div>
      </Container>
    </Style>
  );
};
export default All;
