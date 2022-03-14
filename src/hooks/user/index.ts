import apis, { ApiVersion } from 'apis';
import { useMutation } from 'react-query';
import {
  FormLoginAttributes,
  RequestForgotPassword,
  UseRegisterUserByEmail,
  UseRegisterUserByGoogle,
} from './types';

export const useRegisterUserByGoogle = () => {
  return useMutation(async (data: UseRegisterUserByGoogle) => {
    return apis.post(
      {
        apiVersion: ApiVersion.user,
      },
      'create-account-by-third-party',
      {
        body: {
          type: 'google',
          ...data,
        },
      }
    );
  });
};

export const useRegisterUserByEmail = () => {
  return useMutation((data: UseRegisterUserByEmail) =>
    apis.post(
      {
        apiVersion: ApiVersion.user,
      },
      'create-account',
      {
        body: {
          ...data,
        },
      }
    )
  );
};

export const useLoginByEmail = () => {
  return useMutation((body: FormLoginAttributes) =>
    apis.post(
      {
        apiVersion: ApiVersion.user,
      },
      'login',
      { body }
    )
  );
};

export const useRequestForgotPassword = () => {
  return useMutation((email: string) =>
    apis.post(
      {
        apiVersion: ApiVersion.user,
      },
      'request-forgot-password',
      {
        body: {
          email,
        },
      }
    )
  );
};

export const useChangePasswordByOtp = () => {
  return useMutation((body: RequestForgotPassword) =>
    apis.post(
      {
        apiVersion: ApiVersion.user,
      },
      'change-password-by-otp',
      { body }
    )
  );
};

export const useInfoUser = () => {
  return useMutation((token: string) =>
    apis.get(
      {
        apiVersion: ApiVersion.user,
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      'info-user'
    )
  );
};
