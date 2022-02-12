import React from 'react';
import Style from './style';
import saly1 from 'assets/images/saly1.svg';
import saly2 from 'assets/images/saly2.svg';
import icon_gg from 'assets/images/icon_gg.svg';
import icon_fb from 'assets/images/icon_fb.svg';
export const SignInPage = () => {
  return (
    <Style className='d-flex justify-content-around align-items-center flex-wrap'>
      <div className='col-md-3'>
        <img src={saly1} alt={'img'}></img>
      </div>
      <div className='content'>
        <div className='form-sign-in'>
          <div className='form-sign-in__header d-flex flex-wrap'>
            <div className='col-6'>
              <div className='form-sign-in__header--welcome'>
                Welcome to <span>Be The Heroes</span>
              </div>
              <div className='form-sign-in__header--type'>Sign in</div>
            </div>
            <div className='col-6'>
              <div className='form-sign-in__header--sign-up text-right'>
                Don't have an account?
              </div>
              <div className='form-sign-in__header--sign-up-link text-right'>
                <a href='/sign-up'>Sign up</a>
              </div>
            </div>
          </div>
          <div className='form-sign-in__content col-12'>
            <div className='form-sign-in__content--form-input'>
              <label className='w-100'>Enter username or email address</label>
              <input type='text' placeholder='Username or email address' />
            </div>
            <div className='form-sign-in__content--form-input'>
              <label className='w-100'>Enter your password</label>
              <input type='text' placeholder='Password' />
            </div>
          </div>

          <div className='form-sign-in__footer col-12'>
            <div className='form-sign-in__footer-fg text-right'>
              Forgot Password?
            </div>
            <button className='btn btn--sign-in w-100'>Sign in</button>
          </div>
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
      </div>
      <div className='col-md-3'>
        <img src={saly2} alt={'img'}></img>
      </div>
    </Style>
  );
};
