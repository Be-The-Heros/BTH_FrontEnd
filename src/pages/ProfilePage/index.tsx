import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { Button, Avatar, Image } from "antd";

import { Profile, ContentBody } from "./components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 4em 6em 0;
  background-color: var(--background-light);
`;

const ProfilePage = () => {
  return (
    <Container>
      <Profile />
      <hr className="solid"></hr>
      <ContentBody />
    </Container>
  );
};

export default ProfilePage;
