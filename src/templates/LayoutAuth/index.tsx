import logo_text from 'assets/images/logo_text.svg';
import saly1 from 'assets/images/saly1.svg';
import saly2 from 'assets/images/saly2.svg';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from 'recoil/users/state';
import Style from './style';
const LayoutAuth: React.FC = () => {
  const [user] = useRecoilState(userState);
  const { isLoggedIn } = user;

  return isLoggedIn ? (
    <Navigate to='/' />
  ) : (
    <Style className='d-flex justify-content-around align-items-center flex-wrap'>
      <div className='position-absolute logo'>
        <img src={logo_text} alt='logo'></img>
      </div>
      <div className='col-md-3'>
        <img src={saly1} alt={'img'}></img>
      </div>
      <div className='content'>{<Outlet />}</div>
      <div className='col-md-3'>
        <img src={saly2} alt={'img'}></img>
      </div>
    </Style>
  );
};

export default LayoutAuth;
