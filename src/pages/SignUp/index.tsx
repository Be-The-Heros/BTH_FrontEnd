import React from 'react';
import { useNavigate } from 'react-router';
import { LayoutAuth } from 'templates/LayoutAuth';
import icon_fb from 'assets/images/icon_fb.svg';
import icon_gg from 'assets/images/icon_gg.svg';
import Style from './style';
export default function SignUpPage() {
  const navigate = useNavigate();
  return (
    <LayoutAuth>
      <Style>
        <div className='form-sign-up'>
          <div className='form-sign-up__header d-flex flex-wrap'>
            <div className='col-6'>
              <div className='form-sign-up__header--welcome'>
                Welcome to <span>Be The Heroes</span>
              </div>
              <div className='form-sign-up__header--type'>Sign Up</div>
            </div>
            <div className='col-6'>
              <div className='form-sign-up__header--sign-up text-right'>
                Already have an account?
              </div>
              <div
                className='form-sign-up__header--sign-up-link text-right'
                onClick={() => navigate('/sign-in')}
              >
                Sign In
              </div>
            </div>
          </div>
          <div className='form-sign-up__content col-12'>
            <div className='form-sign-up__content--form-input'>
              <label className='w-100'>Enter email address</label>
              <input type='email' placeholder='example@example.com' />
            </div>
            <div className='form-sign-up__content--form-input d-flex'>
              <div
                className='w-50'
                style={{
                  paddingRight: '1em',
                }}
              >
                <label className='w-100'>Enter Username</label>
                <input placeholder='username' />
              </div>
              <div
                className='w-50'
                style={{
                  paddingLeft: '1em',
                }}
              >
                <label className='w-100'>Enter phone Number</label>
                <input type='number' placeholder='Phone number' />
              </div>
            </div>
            <div className='form-sign-up__content--form-input'>
              <label className='w-100'>Enter password</label>
              <input placeholder='Password' type='password' />
            </div>
            <div className='form-sign-up__content--form-input'>
              <label className='w-100'>Enter confirm password</label>
              <input placeholder='Confirm Password' type='password' />
            </div>
          </div>

          <div className='form-sign-up__footer col-12'>
            <button className='btn btn--sign-up w-100'>Sign Up</button>
          </div>
        </div>
        <div className='plugin w-100 d-flex flex-wrap justify-content-center'>
          <div className='plugin-google'>
            <img src={icon_gg} alt={'icon-gg'} className='plugin-icon'></img>
            Sign Up with Google
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
    </LayoutAuth>
  );
}
