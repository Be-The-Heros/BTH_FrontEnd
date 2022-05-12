import { ProfileInfo } from 'hooks/profile/model';
import React from 'react';
import styled from 'styled-components';
import {
  ProfileForms,
  NotificationForms,
  AccountForms,
  Verifications,
} from '../../components';

const Container = styled.div`
  width: 60%;
`;

interface MainProps {
  currentTab: 'Profile' | 'Notifications' | 'Accounts' | 'Verification';
  userInform?: ProfileInfo;
}

const Main = (props: MainProps) => {
  const { currentTab, userInform } = props;

  return (
    <Container>
      <ProfileForms userInform={userInform} active={currentTab === 'Profile'} />
      <NotificationForms active={currentTab === 'Notifications'} />
      <AccountForms active={currentTab === 'Accounts'} />
      <Verifications active={currentTab === 'Verification'} />
    </Container>
  );
};

export default Main;
