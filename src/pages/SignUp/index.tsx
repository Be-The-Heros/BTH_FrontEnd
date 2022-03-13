import icon_fb from 'assets/images/icon_fb.svg';
import icon_gg from 'assets/images/icon_gg.svg';
import { useRegisterUserByEmail, useRegisterUserByGoogle } from 'hooks/user';
import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { userState } from 'recoil/users/state';
import Style from './style';

type InputsSignUp = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export default function SignUpPage() {
  const mutationUserByGoogle = useRegisterUserByGoogle();
  const mutationUserByEmail = useRegisterUserByEmail();
  const setLoginUser = useSetRecoilState(userState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsSignUp>();
  const navigate = useNavigate();

  useEffect(() => {
    if (mutationUserByGoogle.data) {
      console.log(mutationUserByGoogle.data);
      toast.success('Sign up by google success');
      setLoginUser((state) => {
        return {
          ...state,
          isLoggedIn: true,
        };
      });

      navigate('/');
      const token = mutationUserByGoogle.data as any;
      localStorage.setItem('token', token.token);
    }
    if (!!mutationUserByGoogle.isError) {
      toast.error('Something went wrong mutationUserByGoogle');
    }
  }, [mutationUserByGoogle.data, mutationUserByGoogle.isError]);

  useEffect(() => {
    if (mutationUserByEmail.data) {
      console.log(mutationUserByEmail.data);
      toast.success('Sign up by google success');
    }
    if (!!mutationUserByEmail.isError) {
      toast.error('Something went wrong mutationUserByEmail');
    }
  }, [mutationUserByEmail.data, mutationUserByEmail.isError]);

  const responseGoogle = (response) => {
    const { email, imageUrl, familyName, givenName } = response.profileObj;
    const data = {
      email,
      firstName: familyName,
      lastName: givenName,
      avatar: imageUrl,
      thirdPartyTokens: response.accessToken,
    };
    mutationUserByGoogle.mutate(data);
  };

  const onSubmit: SubmitHandler<InputsSignUp> = (data) => {
    const dataForm = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.firstName + ' ' + data.lastName,
    };
    mutationUserByEmail.mutate(dataForm);
  };

  return (
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
              onClick={() => navigate('/auth/sign-in')}
            >
              Sign In
            </div>
          </div>
        </div>
        <div className='form-sign-up__content col-12'>
          <div className='form-sign-up__content--form-input'>
            <label className='w-100'>Enter email address</label>
            <input
              type='email'
              placeholder='example@example.com'
              {...register('email', { required: true })}
            />
          </div>
          <div className='form-sign-up__content--form-input d-flex'>
            <div
              className='w-50'
              style={{
                paddingRight: '1em',
              }}
            >
              <label className='w-100'>Enter Username</label>
              <input
                placeholder='First name'
                {...register('firstName', { required: true })}
              />
            </div>
            <div
              className='w-50'
              style={{
                paddingLeft: '1em',
              }}
            >
              <label className='w-100'>Enter Phone</label>
              <input
                placeholder='Last name'
                {...register('lastName', {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className='form-sign-up__content--form-input'>
            <label className='w-100'>Enter password</label>
            <input
              placeholder='Password'
              type='password'
              {...register('password', { required: true })}
            />
          </div>
          <div className='form-sign-up__content--form-input'>
            <label className='w-100'>Enter confirm password</label>
            <input
              placeholder='Confirm Password'
              type='password'
              {...register('confirmPassword', {
                required: true,
                validate: (value) => {
                  return (
                    value === watch('password') || 'Passwords do not match'
                  );
                },
              })}
            />
            <div className='text-danger '>
              {errors.confirmPassword && errors.confirmPassword.message}
            </div>
          </div>
        </div>

        <div className='form-sign-up__footer col-12'>
          <button
            className='btn btn--sign-up w-100  '
            onClick={handleSubmit(onSubmit)}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className='plugin w-100 d-flex flex-wrap justify-content-center'>
        <GoogleLogin
          clientId='966248665452-u9mhhvcofgfr7b0h7nnhf03j6krt8gv7.apps.googleusercontent.com'
          render={(renderProps) => (
            <div className='plugin-google' onClick={renderProps.onClick}>
              <img src={icon_gg} alt={'icon-gg'} className='plugin-icon'></img>
              Sign Up with Google
            </div>
          )}
          buttonText='Login'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />

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
