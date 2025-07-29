import axios from "axios";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { ADMIN_ROUTE_PATH, AdminRoutePath } from "consts/route.const";

let isRefreshing = false;
let failedQueue: (() => void)[] = [];

export const protectApi = axios.create({
  baseURL: process.env[ENV_API_END_POINT_KEY],
  withCredentials: true,
  adapter: "fetch",
  fetchOptions: {
    cache: "no-cache",
  },
});

export const publicApi = axios.create({
  baseURL: process.env[ENV_API_END_POINT_KEY],
  adapter: "fetch",
});

protectApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push(() => resolve(protectApi(originalRequest)));
        });
      }

      isRefreshing = true;
      try {
        await axios.get("/admin/refresh", {
          baseURL: process.env[ENV_API_END_POINT_KEY],
          withCredentials: true,
          adapter: "fetch",
          fetchOptions: {
            cache: "no-cache",
          },
        });

        failedQueue.forEach((cb) => cb());
        failedQueue = [];
        return protectApi(originalRequest);
      } catch {
        failedQueue = [];
        window.location.href = `${ADMIN_ROUTE_PATH}${AdminRoutePath.LOGIN}`;
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
