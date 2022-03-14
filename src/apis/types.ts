import { AxiosRequestHeaders } from 'axios';

export interface Config {
  api: {
    kycUrl: string;
    useUrl: string;
  };
}

export enum ApiVersion {
  kyc = 'kyc',
  user = 'user',
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
}

export interface RequestPayload {
  body?: JsonBody | FormData;
  params?: Object;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}
