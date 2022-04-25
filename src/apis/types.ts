import { AxiosRequestHeaders } from 'axios';

export interface Config {
  api: {
    kycUrl: string;
    userUrl: string;
    authUrl: string;
    otpUrl: string;
    postUrl: string;
    profileUrl: string;
    imageUrl: string;
    inviteUrl: string;
  };
}

export enum ApiVersion {
  kyc = 'kyc',
  user = 'user',
  auth = 'auth',
  otp = 'otp',
  post = 'post',
  profile = 'profile',
  image = 'image',
  comment = 'comment',
  invite = 'invite',
}

export interface RequestOptions {
  apiVersion: ApiVersion;
  headers?: AxiosRequestHeaders;
  widthHeader?: boolean;
}

export interface JsonBody {
  [key: string]: any;
}

export interface RequestPayload {
  body?: JsonBody | FormData;
  params?: Object;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}
