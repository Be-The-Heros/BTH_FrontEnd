import icon_fb from 'assets/images/icon_fb.svg';
import icon_gg from 'assets/images/icon_gg.svg';
import { isEmptyValue } from 'helpers';
import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import Style from './style';

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = React.useState(true);
  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);
  const [info, setInfo] = React.useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  return (
    <Style>
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
            <div
              className='form-sign-in__header--sign-up-link text-right'
              onClick={() => navigate('/auth/sign-up')}
            >
              Sign up
            </div>
          </div>
        </div>
        <div className='form-sign-in__content col-12'>
          <div className='form-sign-in__content--form-input'>
            <label className='w-100'>Enter username or email address</label>
            <input
              type='text'
              placeholder='Username or email address'
              onChange={(event) => {
                setInfo({ ...info, email: event.target.value });
              }}
            />
          </div>
          <div className='form-sign-in__content--form-input'>
            <label className='w-100'>Enter your password</label>
            <input
              type={isShowPassword ? 'password' : 'text'}
              placeholder='Password'
              onChange={(event) => {
                setInfo({ ...info, password: event.target.value });
              }}
            />
            {isShowPassword ? (
              <AiOutlineEyeInvisible onClick={() => toggleShowPassword()} />
            ) : (
              <AiOutlineEye onClick={() => toggleShowPassword()} />
            )}
          </div>
        </div>

        <div className='form-sign-in__footer col-12'>
          <div
            className='form-sign-in__footer-fg text-right'
            onClick={() => navigate('/auth/forgot-password')}
          >
            Forgot Password?
          </div>
          <button
            className='btn btn--sign-in w-100'
            disabled={isEmptyValue(info)}
            onClick={() => navigate('/')}
          >
            Sign in
          </button>
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
    </Style>
  );
};

export default SignInPage;
