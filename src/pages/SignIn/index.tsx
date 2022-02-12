import React from 'react';
import Style from './style';
export const SignInPage = () => {
  return (
    <Style className='d-flex justify-content-center align-items-center'>
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

        <div className=''></div>
      </div>
    </Style>
  );
};
