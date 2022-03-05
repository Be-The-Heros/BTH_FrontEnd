import React from "react";
import { useMutation } from "react-query";
import axios from "axios";

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
  return useMutation((data: UseRegisterUserByGoogle) =>
    axios
      .post("http://localhost:5000/api/user/create-account-by-third-party", {
        type: "google",
        ...data,
      })
      .then((res) => res.data)
  );
};

export const useRegisterUserByEmail = () => {
  return useMutation((data: UseRegisterUserByEmail) =>
    axios
      .post("http://localhost:5000/api/user/create-account", {
        ...data,
      })
      .then((res) => res.data)
  );
};

export const useLoginByEmail = () => {
  return useMutation((data: UseLoginByEmail) =>
    axios
      .post("http://localhost:5000/api/user/login", {
        ...data,
      })
      .then((res) => res.data)
  );
};

export const useRequestForgotPassword = () => {
  return useMutation((email: string) =>
    axios
      .post("http://localhost:5000/api/user/request-forgot-password", {
        email,
      })
      .then((res) => res.data)
  );
};

export const useChangePasswordByOtp = () => {
  return useMutation((data: UseChangePasswordByOtp) => {
    return axios
      .post("http://localhost:5000/api/user/change-password-by-otp", {
        ...data,
      })
      .then((res) => res.data);
  });
};
