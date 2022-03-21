import { getLocalStorage } from 'helpers/setTitleDocument';
import axiosClient from './config';
import { RequestOptions, RequestPayload } from './types';
import { devUrl, productionUrl } from './urls';

const is_dev = process.env.NODE_ENV !== 'production';

export const getUrl = (apiVersion: RequestOptions['apiVersion']) => {
  return is_dev ? devUrl[apiVersion] : productionUrl[apiVersion];
};

export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

export const makeRequest = async (
  config: RequestOptions,
  url: string,
  payload: RequestPayload
): Promise<any> => {
  const { apiVersion, headers } = config;
  const { body, params, method } = payload;
  const baseUrl = getUrl(apiVersion);
  const token = getLocalStorage('token');
  const contentType =
    body instanceof FormData ? 'multipart/form-data' : 'application/json';
  const defaultHeaders = {
    'content-type': contentType,
    authorization: `Bearer ${token}`,
  };

  const response = await axiosClient(url, {
    baseURL: baseUrl,
    params: params,
    headers: { ...defaultHeaders, ...headers },
    data: body,
    method,
  });
  return response;
};
