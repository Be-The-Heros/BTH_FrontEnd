import React, { useState } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { Menu } from "./components";
import { Main } from "./containers";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5em 10em;
`;

const ProfileSettingsPage = () => {
  const [tabState, setTabState] = useState("profile");

  const handleSetTabState = (state: string) => {
    setTabState(state);
  };

  return (
    <Container>
      <Menu currentTab={tabState} handleSetTabState={handleSetTabState} />
      <Main currentTab={tabState} />
    </Container>
  );
};

export default ProfileSettingsPage;
