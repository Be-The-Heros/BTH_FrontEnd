import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { Button } from "antd";

import { NewCustomInput } from "../";

export interface ProfileFormsProps {
  active: boolean;
}

const Container = styled.div<ProfileFormsProps>`
  width: 100%;
  display: ${(props) => !props.active && "none"};

  .save-profile-information {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 2em 3em;
  }

  input {
    margin-bottom: 2em;
  }
`;

const Title = styled(Typography)`
  && {
    font-weight: 700;
    line-height: 42px;
    letter-spacing: 0em;
    padding-bottom: 1em;
  }
`;

const UserInformContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 2em 3em;
  margin: 5.6em 0 3em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const WorkInformContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 2em 3em;
  margin-bottom: 3em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SaveProfileInformationButton = styled(Button)`
  width: 100%;
  background-color: #7cdfff;
  font-weight: 600;
`;

const ProfileForms = (props: ProfileFormsProps) => {
  const { active } = props;

  return (
    <Container active={active}>
      <UserInformContainer>
        <Title variant="h4">User</Title>
        <NewCustomInput label="Name" placeholder="TrungJamin" />
        <NewCustomInput label="Country" placeholder="Viet Nam" />
        <NewCustomInput label="City" placeholder="Da Nang" />
        <NewCustomInput label="Address" placeholder="K02/30 Nguyen The Loc" />
        <NewCustomInput label="Bio" placeholder="YOLO" />
        <NewCustomInput label="Email" placeholder="trungjaminle@gmail.com" />
      </UserInformContainer>

      <WorkInformContainer>
        <Title variant="h4">Work</Title>
        <NewCustomInput label="Work" placeholder="Student" />
        <NewCustomInput label="Education" placeholder="Student" />
      </WorkInformContainer>

      <div className="save-profile-information">
        <SaveProfileInformationButton>
          Save Profile Information
        </SaveProfileInformationButton>
      </div>
    </Container>
  );
};

export default ProfileForms;
