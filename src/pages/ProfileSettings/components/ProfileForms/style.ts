import styled from "styled-components";
import { Typography } from "@mui/material";
import { Button } from "antd";
import { ProfileFormsProps } from ".";

export const Container = styled.div<ProfileFormsProps>`
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

export const Title = styled(Typography)`
  && {
    font-weight: 700;
    line-height: 42px;
    letter-spacing: 0em;
    padding-bottom: 1em;
  }
`;

export const UserInformContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 2em 3em;
  margin: 5.6em 0 3em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const WorkInformContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 2em 3em;
  margin-bottom: 3em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const SaveProfileInformationButton = styled(Button)`
  width: 100%;
  background-color: #7cdfff;
  font-weight: 600;
`;
