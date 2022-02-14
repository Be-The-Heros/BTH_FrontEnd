import React from 'react';
import Style from './style';
import saly1 from 'assets/images/saly1.svg';
import saly2 from 'assets/images/saly2.svg';
import logo_text from 'assets/images/logo_text.svg';
const LayoutAuth: React.FC = ({ children }) => {
  return (
    <Style className='d-flex justify-content-around align-items-center flex-wrap'>
      <div className='position-absolute logo'>
        <img src={logo_text} alt='logo'></img>
      </div>
      <div className='col-md-3'>
        <img src={saly1} alt={'img'}></img>
      </div>
      <div className='content'>{children}</div>
      <div className='col-md-3'>
        <img src={saly2} alt={'img'}></img>
      </div>
    </Style>
  );
};

export default LayoutAuth;
