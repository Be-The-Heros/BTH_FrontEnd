import icon_fb from 'assets/images/icon_fb.svg';
import icon_gg from 'assets/images/icon_gg.svg';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CheckingOTP } from './components/CheckingOTP';
import Style from './style';
import { toast } from 'react-toastify';
import { BoxEmail } from './components/BoxEmail';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [isOpenOTP, setIsOpenOTP] = useState(true);
  const [email, setEmail] = useState('');

  return (
    <Style>
      <div className='form-forgot-password'>
        <div className='form-forgot-password__header d-flex flex-wrap'>
          <div className='col-6'>
            <div className='form-forgot-password__header--welcome'>
              Welcome to <span>Be The Heroes</span>
            </div>
            <div className='form-forgot-password__header--type'>
              {`${isOpenOTP ? 'Change password' : 'Forgot Password'}`}
            </div>
          </div>
          <div className='col-6'>
            <div className='form-forgot-password__header--sign-up text-right'>
              Don't have an account?
            </div>
            <div
              className='form-forgot-password__header--sign-up-link text-right'
              onClick={() => navigate('/auth/sign-up')}
            >
              Sign up
            </div>
          </div>
        </div>
        {isOpenOTP ? (
          <CheckingOTP goBack={() => setIsOpenOTP(false)} email={email} />
        ) : (
          <BoxEmail sendOtp={() => {}} setEmail={setEmail} />
        )}
      </div>
      <div className='plugin w-100 d-flex flex-wrap justify-content-center'>
        <div className='plugin-google'>
          <img src={icon_gg} alt={'icon-gg'} className='plugin-icon'></img>
          Sign In with Google
        </div>
        <div
          className='plugin-facebook'
          style={{
            marginLeft: '1rem',
          }}
        >
          <img src={icon_fb} alt={'icon-fb'} className='plugin-icon'></img>
        </div>
      </div>
    </Style>
  );
}
