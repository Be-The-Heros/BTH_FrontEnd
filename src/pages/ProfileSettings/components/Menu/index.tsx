import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Typography } from '@mui/material';
import { ProfileInfo } from 'hooks/profile/model';
import React from 'react';
import styled from 'styled-components';
import { MenuItem } from '..';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const Container = styled.div`
  width: 40%;
`;

interface MenuProps {
  currentTab: 'Profile' | 'Notifications' | 'Accounts' | 'Verification';
  handleSetTabState: (
    state: 'Profile' | 'Notifications' | 'Accounts' | 'Verification'
  ) => void;
  userInform?: ProfileInfo;
}
const Menu = (props: MenuProps) => {
  const { currentTab, handleSetTabState, userInform } = props;

  const full_name = userInform?.first_name + ' ' + userInform?.last_name;

  console.log(
    'typeof: ',
    typeof currentTab,
    currentTab,
    currentTab === 'Profile'
  );

  return (
    <Container>
      <Typography variant='h4' style={{ marginBottom: 40 }}>
        Settings for {full_name}
      </Typography>
      <MenuItem
        title='Profile'
        icon={<PersonIcon />}
        active={currentTab === 'Profile'}
        onClick={handleSetTabState}
      />
      <MenuItem
        title='Notifications'
        active={currentTab === 'Notifications'}
        icon={<NotificationsActiveIcon />}
        onClick={handleSetTabState}
      />
      <MenuItem
        title='Accounts'
        active={currentTab === 'Accounts'}
        icon={<VerifiedIcon />}
        onClick={handleSetTabState}
      />
      <MenuItem
        title='Verification'
        active={currentTab === 'Verification'}
        icon={<WorkspacePremiumIcon />}
        onClick={handleSetTabState}
      />
    </Container>
  );
};

export default Menu;
