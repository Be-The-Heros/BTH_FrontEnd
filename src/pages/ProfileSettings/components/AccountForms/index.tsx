import React from "react";

import styled from "styled-components";
import { Typography } from "@mui/material";
import { NewCustomInput } from "../";
import { Button } from "antd";

interface AccountFormsProps {
  active: boolean;
}

const Container = styled.div<AccountFormsProps>`
  width: 100%;
  display: ${(props) => !props.active && "none"};

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

const SetNewPasswordContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 2em 3em;
  margin: 5.6em 0 3em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .set-new-password-btn-container {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`;

const AccountEmailContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 2em 3em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .account-email-container__inform {
    display: flex;
    flex-direction: row;
  }
`;

const ChangePasswordButton = styled(Button)`
  background-color: #7cdfff;
  font-weight: 600;
  margin: 1em 0;
`;

const DangerZoneContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 2em 3em;
  margin: 5.6em 0 3em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const DeleteAccountButton = styled(Button)`
  background-color: rgba(255, 11, 11, 1);
  font-weight: 600;
  margin-top: 3em;
  color: #fff;
`;

const AccountForms = (props: AccountFormsProps) => {
  const { active } = props;

  return (
    <Container active={active}>
      <SetNewPasswordContainer>
        <Title variant="h4">Set new password</Title>

        <NewCustomInput className="" label="Current password" />
        <NewCustomInput label="Password" />
        <NewCustomInput label="Confirm new password" />
        <div className="set-new-password-btn-container">
          <ChangePasswordButton>Set new password</ChangePasswordButton>
        </div>
      </SetNewPasswordContainer>

      <AccountEmailContainer>
        <Title variant="h4">Account email</Title>
        <div className="account-email-container__inform">
          <Typography
            variant="body1"
            style={{
              fontWeight: 700,
              color: "rgba(0, 0, 0, 0.6)",
              marginRight: 20,
            }}
          >
            Email
          </Typography>
          <Typography variant="body1" style={{ fontWeight: 300 }}>
            trungjaminle@gmail.com
          </Typography>
        </div>
      </AccountEmailContainer>

      <DangerZoneContainer>
        <Title variant="h4" style={{ color: "rgba(255, 11, 11, 1)" }}>
          Danger Zone
        </Title>
        <Typography
          variant="body1"
          style={{ fontWeight: 700, marginBottom: 30 }}
        >
          Delete account
        </Typography>

        <Typography variant="body1">Deleting your account will: </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <span style={{ marginLeft: 10, marginRight: 15 }}>&#8226;</span>
          <Typography variant="body1">
            Delete any and all content you have, such as posts, comments, or
            your sharing posts.
          </Typography>
        </div>
        <DeleteAccountButton>Delete Account</DeleteAccountButton>
      </DangerZoneContainer>
    </Container>
  );
};

export default AccountForms;
