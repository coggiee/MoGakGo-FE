import axios from "axios";

import { getCookie } from "../utils/cookie";
import { reIssueAccessToken } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const SERVER_VERSION = "/api/v1";

export const instance = axios.create({
  baseURL: `${BASE_URL}${SERVER_VERSION}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(config => {
  const accessToken =
    localStorage.getItem("accessToken") ??
    sessionStorage.getItem("accessToken");

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

instance.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    const { status, config } = error.response;

    const refreshToken = await getCookie("refreshToken", "");

    // TODO: 비회원 api 업데이트 후 제거
    if (!refreshToken) return Promise.reject(error);

    if (status === 401) {
      const newAccessToken = await reIssueAccessToken(refreshToken);

      if (!newAccessToken) return Promise.reject(error);

      if (config.url !== "/auth/reissue") {
        localStorage.setItem("accessToken", newAccessToken);

        config.headers.Authorization = `Bearer ${newAccessToken}`;

        return instance(config);
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
