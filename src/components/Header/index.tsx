import React from 'react';
import Style from './style';
import logo from 'assets/images/logo.svg';
import { Button, Space } from 'antd';
import Search from 'antd/lib/transfer/search';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { userState } from 'recoil/users/state';
import { useRecoilState } from 'recoil';
import { MdOutlineArrowDropDown } from 'react-icons/md';
export const Header = () => {
  const [isOpenNotification, setIsOpenNotification] = React.useState(false);
  const [user] = useRecoilState(userState);
  const renderDropdownNotification = () => {
    return <div className='header__notification'></div>;
  };
  return (
    <Style className='header d-flex justify-content-center'>
      <div className='col-6 d-flex  align-items-center'>
        <div className='header__logo'>
          <img src={logo} alt='logo' />
        </div>
        <div className='header__search'>
          <Space
            direction='vertical'
            style={{
              width: '100%',
            }}
          >
            <Search placeholder='Search' />
          </Space>
        </div>
      </div>
      <div className='col-6 d-flex justify-content-end align-items-center'>
        <div className='header__create-post'>
          <Button>Create Post</Button>
        </div>
        <div className='header__notification'>
          <IoIosNotificationsOutline
            onClick={() => setIsOpenNotification(!isOpenNotification)}
          />
          {isOpenNotification && renderDropdownNotification()}
        </div>
        <div className='header__avatar'>
          <img src={user.avatar} alt={'user-avatar'}></img>
          <MdOutlineArrowDropDown />
        </div>
      </div>
    </Style>
  );
};
