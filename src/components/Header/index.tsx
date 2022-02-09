import React from 'react';
import Style from './style';
import logo from 'assets/images/logo.svg';
import { Space } from 'antd';
import Search from 'antd/lib/transfer/search';
import { ButtonCustom } from 'components/Button';
export const Header = () => {
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
          <ButtonCustom variant='primary' className='btn btn--primary'>
            Create Post
          </ButtonCustom>
        </div>
      </div>
    </Style>
  );
};
