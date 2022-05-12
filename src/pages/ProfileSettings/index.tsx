import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { Menu } from './components';
import { Main } from './containers';
import { useGetProfileInformByUID } from 'hooks/profile/getProfileInform/useGetProfileInform';
import { userState } from 'recoil/users/state';
import { useRecoilValue } from 'recoil';
import Loading from 'components/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 2% 5em;
`;

const ProfileSettingsPage = () => {
  const [tabState, setTabState] = useState<
    'Profile' | 'Notifications' | 'Accounts' | 'Verification'
  >('Profile');

  const handleSetTabState = (
    state: 'Profile' | 'Notifications' | 'Accounts' | 'Verification'
  ) => {
    setTabState(state);
  };

  let user = useRecoilValue(userState);

  const mutation = useGetProfileInformByUID();

  React.useEffect(() => {
    mutation.mutate({ uid: user.uid! });

    if (mutation.isSuccess) {
      console.log('Data:', mutation);
    } else {
      console.log('Error: ', mutation.error);
    }
  }, []);

  if (mutation.isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Menu
        currentTab={tabState}
        handleSetTabState={handleSetTabState}
        userInform={mutation.data}
      />
      <Main userInform={mutation.data} currentTab={tabState} />
    </Container>
  );
};

export default ProfileSettingsPage;
