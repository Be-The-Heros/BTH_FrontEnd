import React from 'react';
import Style from './style';
import saly1 from 'assets/images/saly1.svg';
import saly2 from 'assets/images/saly2.svg';
export const LayoutAuth: React.FC = ({ children }) => {
  return (
    <Style className='d-flex justify-content-around align-items-center flex-wrap'>
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
