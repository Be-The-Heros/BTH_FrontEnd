import { Button, Dropdown, Menu, Space } from 'antd';
import Search from 'antd/lib/transfer/search';
import logo from 'assets/images/logo_white.svg';
import React from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from 'recoil/users/state';
import Style from './style';

export const Header = () => {
  const [isOpenNotification, setIsOpenNotification] = React.useState(false);
  const navigate = useNavigate();
  const resetUser = useResetRecoilState(userState);
  const user = useRecoilValue(userState);
  console.log(user);

  const renderDropdownNotification = () => {
    return <div className='header__notification'></div>;
  };

  const menu = (
    <Menu>
      <Menu.Item key={1}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onClick={() => {
            resetUser();
            localStorage.clear();
          }}
        >
          <div>Logout</div>
          <BiLogOutCircle />
        </div>
      </Menu.Item>
    </Menu>
  );
  const renderNav = () => {
    if (user.isLoggedIn) {
      return (
        <div className='w-50 d-flex justify-content-end align-items-center'>
          <div className='header__create-post'>
            <Button onClick={() => navigate('/create-post')}>
              Create Post
            </Button>
          </div>
          <div className='header__notification'>
            <IoIosNotificationsOutline
              onClick={() => setIsOpenNotification(!isOpenNotification)}
            />
            {isOpenNotification && renderDropdownNotification()}
          </div>
          <Dropdown overlay={menu} placement='bottomRight'>
            <div className='header__avatar'>
              <img src={user.avatar} alt={'user-avatar'}></img>
              <MdOutlineArrowDropDown />
            </div>
          </Dropdown>
        </div>
      );
    }
    return (
      <div className='w-50 d-flex justify-content-end align-items-center'>
        <div className='header__btn-login'>
          <Button onClick={() => navigate('/auth/sign-in')}>Login</Button>
        </div>
        <div
          className='header__btn-register'
          style={{
            marginLeft: '1.5em',
          }}
        >
          <Button onClick={() => navigate('/auth/sign-up')}>
            Create account
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Style className='header d-flex justify-content-center'>
      <div className='w-50 d-flex  align-items-center'>
        <div
          className='header__logo'
          onClick={() => navigate('/')}
          style={{
            cursor: 'pointer',
          }}
        >
          <img src={logo} alt='logo' />
        </div>
        <div className='header__search'>
          <Space
            direction='vertical'
            style={{
              width: '100%',
            }}
          >
            <Search placeholder='Search in be the heroes' />
          </Space>
        </div>
      </div>
      {renderNav()}
    </Style>
  );
};
