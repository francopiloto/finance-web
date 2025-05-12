import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { refreshTokens } from '@/features/auth/api/refresh.api';
import { getAccessToken, getRefreshToken } from '@/features/auth/lib/tokenStorage';
import { RefreshTokenResult } from '@/features/auth/types/refresh.types';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

let failedQueue: ((res: RefreshTokenResult) => void)[] = [];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry && getRefreshToken()) {
      return new Promise((resolve, reject) => {
        failedQueue.push((res: RefreshTokenResult) => {
          if (res.success) {
            originalRequest._retry = true;
            originalRequest.headers.Authorization = res.accessToken;
            resolve(axiosInstance(originalRequest));
          } else {
            reject(res.error);
          }
        });

        if (failedQueue.length === 1) {
          refreshTokens().then((res) => {
            failedQueue.forEach((cb) => cb(res));
            failedQueue = [];
          });
        }
      });
    }

    return Promise.reject(error);
  },
);
