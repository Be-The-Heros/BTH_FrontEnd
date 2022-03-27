import React from "react";
import styled from "styled-components";
import {
  ProfileForms,
  NotificationForms,
  AccountForms,
  OrganizationForms,
} from "../../components";

const Container = styled.div`
  width: 60%;
`;

interface MainProps {
  currentTab: string;
}

const Main = (props: MainProps) => {
  const { currentTab } = props;

  return (
    <Container>
      <ProfileForms active={currentTab === "profile"} />
      <NotificationForms active={currentTab === "notifications"} />
      <AccountForms active={currentTab === "accounts"} />
      <OrganizationForms active={currentTab === "organizations"} />
    </Container>
  );
};

export default Main;