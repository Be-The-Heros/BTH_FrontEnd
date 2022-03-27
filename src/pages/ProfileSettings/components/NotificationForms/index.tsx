import React from "react";

import styled from "styled-components";
import { Typography } from "@mui/material";
import { Checkbox } from "antd";

interface NotificationsFormsProps {
  active: boolean;
}

const Container = styled.div<NotificationsFormsProps>`
  width: 100%;
  display: ${(props) => !props.active && "none"};

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #7cdfff;
    border-color: transparent;
  }

  .check-box {
    margin: 1em 0;

    &__content {
      margin-left: 1.5em;
    }
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

const EmailNotificationsContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 2em 3em;
  margin: 5.6em 0 3em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const CheckBoxList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const GeneralNotificationsContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 2em 3em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const NotificationsForms = (props: NotificationsFormsProps) => {
  const { active } = props;

  return (
    <Container active={active}>
      <EmailNotificationsContainer>
        <Title variant="h4">Email Notifications</Title>
        <CheckBoxList>
          <Checkbox className="check-box">
            <span className="check-box__content">
              Send me an email when someone replies to me in a comment thread
            </span>
          </Checkbox>
          <Checkbox className="check-box">
            <span className="check-box__content">
              Send me an email when someone mentions me
            </span>
          </Checkbox>
          <Checkbox className="check-box">
            <span className="check-box__content">
              Send me an email when someone joins my projects
            </span>
          </Checkbox>
        </CheckBoxList>
        <div></div>
      </EmailNotificationsContainer>

      <GeneralNotificationsContainer>
        <Title variant="h4">General Notifications</Title>
        <Checkbox className="check-box">
          <span className="check-box__content">
            Send notifications when someone reacts to my comments or post{" "}
          </span>
        </Checkbox>
      </GeneralNotificationsContainer>
    </Container>
  );
};

export default NotificationsForms;
