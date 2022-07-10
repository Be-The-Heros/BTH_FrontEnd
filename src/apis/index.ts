import { makeRequest } from "./api";
import { RequestOptions, RequestPayload } from "./types";
export * from "./types";
export * from "./urls";
export * from "./config";
export * from "./api";
class API {
  async get<T>(
    config: RequestOptions,
    url: string,
    payload?: RequestPayload
  ): Promise<T> {
    return makeRequest(config, url, { ...payload, method: "GET" });
  }
  async post<T>(
    config: RequestOptions,
    url: string,
    payload?: RequestPayload
  ): Promise<T> {
    return makeRequest(config, url, { ...payload, method: "POST" });
  }
  async put<T>(
    config: RequestOptions,
    url: string,
    payload?: RequestPayload
  ): Promise<T> {
    return makeRequest(config, url, { ...payload, method: "PUT" });
  }
  async delete<T>(
    config: RequestOptions,
    url: string,
    payload?: RequestPayload
  ): Promise<T> {
    return makeRequest(config, url, { ...payload, method: "DELETE" });
  }
  async patch<T>(
    config: RequestOptions,
    url: string,
    payload?: RequestPayload
  ): Promise<T> {
    return makeRequest(config, url, { ...payload, method: "PATCH" });
  }
}

export default new API();
