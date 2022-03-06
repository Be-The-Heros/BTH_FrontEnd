import React from "react";
import { useMutation } from "react-query";
import apis, { ApiVersion } from "apis";

export interface UseRegisterUserByGoogle {
  thirdPartyTokens: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface UseRegisterUserByEmail {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface UseLoginByEmail {
  email: string;
  password: string;
}

export interface UseChangePasswordByOtp {
  email: string;
  newPassword: string;
  otp: number;
}

export const useRegisterUserByGoogle = () => {
  return useMutation(async (data: UseRegisterUserByGoogle) => {
    return apis.post(
      {
        apiVersion: ApiVersion.user,
      },
      "create-account-by-third-party",
      {
        body: {
          type: "google",
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
      "create-account",
      {
        body: {
          ...data,
        },
      }
    )
  );
};

export const useLoginByEmail = () => {
  return useMutation((data: UseLoginByEmail) =>
    apis.post(
      {
        apiVersion: ApiVersion.user,
      },
      "login",
      {
        body: {
          ...data,
        },
      }
    )
  );
};

export const useRequestForgotPassword = () => {
  return useMutation((email: string) =>
    apis.post(
      {
        apiVersion: ApiVersion.user,
      },
      "request-forgot-password",
      {
        body: {
          email,
        },
      }
    )
  );
};

export const useChangePasswordByOtp = () => {
  return useMutation((data: UseChangePasswordByOtp) =>
    apis.post(
      {
        apiVersion: ApiVersion.user,
      },
      "change-password-by-otp",
      {
        body: {
          ...data,
        },
      }
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
      "info-user"
    )
  );
};
