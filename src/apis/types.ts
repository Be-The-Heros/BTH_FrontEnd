import { AxiosRequestHeaders } from 'axios';

export interface Config {
  api: {
    kycUrl: string;
    useUrl: string;
    authUrl: string;
    otpUrl: string;
    postUrl: string;
    profileUrl: string;
  };
}

export enum ApiVersion {
  kyc = 'kyc',
  user = 'user',
  auth = 'auth',
  otp = 'otp',
  post = 'post',
  profile = 'profile',
}

export interface RequestOptions {
  apiVersion: ApiVersion;
  headers?: AxiosRequestHeaders;
  widthHeader?: boolean;
}

export interface JsonBody {
  [key: string]: any;
}

declare global {
  interface Window {
    url: Config;
  }
  enum ApiVersion {
    kyc = 'kyc',
    user = 'user',
    auth = 'auth',
    otp = 'otp',
  }
}

export interface RequestPayload {
  body?: JsonBody | FormData;
  params?: Object;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}
