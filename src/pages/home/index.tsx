import { useInfoUser } from 'hooks/user';
import React, { useEffect } from 'react';
import { SidebarLeft } from './components';
const Homepage = () => {
  const infoUser = useInfoUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      infoUser.mutate(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (infoUser.data) {
      console.log(infoUser.data);
    }

    if (infoUser.error) {
      console.log(infoUser.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoUser.data, infoUser.error]);

  return (
    <>Homepage</>
    // <LayoutApp sidebarLeft={<SidebarLeft />} sidebarRight={<SidebarRight />}>
    // </LayoutApp>
  );
};
export default Homepage;
