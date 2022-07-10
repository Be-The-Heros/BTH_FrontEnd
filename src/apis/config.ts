import axios, { AxiosError, AxiosResponse } from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse<ResponseCustom<any>, any>) => {
    if (response && response.data) {
      if (response.data.data?.token) {
        localStorage.setItem("token", response.data.data.token);
      }
      return response.data.data || response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 404) {
      toast.error("Not found api");
    }
    if (error.response?.status === 401) {
      // window.location.href = '/';
      localStorage.clear();
    } else {
      toast.dismiss();
      toast.error(error.response?.data.message);
    }
    throw new Error(error.response?.data.message || error.message);
  }
);

export default axiosClient;
