import styled from "styled-components";
import { AccountFormsProps } from ".";
import { Typography } from "@mui/material";
import { Button } from "antd";

export const Container = styled.div<AccountFormsProps>`
  width: 100%;
  display: ${(props) => !props.active && "none"};

  .ant-input-affix-wrapper {
    margin-bottom: 1em;
  }
`;

export const Title = styled(Typography)`
  && {
    font-weight: 700;
    line-height: 42px;
    letter-spacing: 0em;
    padding-bottom: 1em;
  }
`;

export const SetNewPasswordContainer = styled.div`
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

export const AccountEmailContainer = styled.div`
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

export const ChangePasswordButton = styled(Button)`
  background-color: #7cdfff;
  font-weight: 600;
  margin: 1em 0;
`;

export const DangerZoneContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 2em 3em;
  margin: 5.6em 0 3em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const DeleteAccountButton = styled(Button)`
  background-color: rgba(255, 11, 11, 1);
  font-weight: 600;
  margin-top: 3em;
  color: #fff;
`;
