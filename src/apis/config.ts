import axios, { AxiosError, AxiosResponse } from 'axios';
import queryString from 'query-string';
import { toast } from 'react-toastify';

const axiosClient = axios.create({
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse<ResponseCustom<any>, any>) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    toast.error(error.response?.data.message);
    throw new Error(error.response?.data.message || error.message);
  }
);

export default axiosClient;
