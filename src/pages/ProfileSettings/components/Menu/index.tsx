import React from "react";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { MenuItem } from "..";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import VerifiedIcon from "@mui/icons-material/Verified";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { useRecoilValue } from "recoil";
import { userState } from "recoil/users/state";
import { useGetProfileInformByUID } from "hooks/profile/getProfileInform/useGetProfileInform";
import { ProfileInfo } from "hooks/profile/model";

const Container = styled.div`
  width: 40%;
`;

interface MenuProps {
  currentTab: string;
  handleSetTabState: (state: string) => void;
  userInform: ProfileInfo;
}
const Menu = (props: MenuProps) => {
  const { currentTab, handleSetTabState, userInform } = props;

  const full_name = userInform.first_name + " " + userInform.last_name;

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: 40 }}>
        Settings for {full_name}
      </Typography>
      <MenuItem
        title="Profile"
        icon={<PersonIcon />}
        active={currentTab === "profile"}
        onClick={handleSetTabState}
      />
      <MenuItem
        title="Notifications"
        active={currentTab === "notifications"}
        icon={<NotificationsActiveIcon />}
        onClick={handleSetTabState}
      />
      <MenuItem
        title="Accounts"
        active={currentTab === "accounts"}
        icon={<VerifiedIcon />}
        onClick={handleSetTabState}
      />
      <MenuItem
        title="Organizations"
        active={currentTab === "organizations"}
        icon={<CorporateFareIcon />}
        onClick={handleSetTabState}
      />
    </Container>
  );
};

export default Menu;
