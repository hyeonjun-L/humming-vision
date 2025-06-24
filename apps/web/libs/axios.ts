import axios from "axios";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { ADMIN_ROUTE_PATH, AdminRoutePath } from "consts/route.const";

let isRefreshing = false;
let failedQueue: (() => void)[] = [];

const api = axios.create({
  baseURL: process.env[ENV_API_END_POINT_KEY],
  withCredentials: true,
  adapter: "fetch",
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push(() => resolve(api(originalRequest)));
        });
      }

      isRefreshing = true;
      try {
        const refreshResponse = await fetch("/api/admin/refresh", {
          method: "GET",
          credentials: "include",
        });

        if (!refreshResponse.ok) {
          throw new Error(
            `Refresh failed with status: ${refreshResponse.status}`,
          );
        }

        failedQueue.forEach((cb) => cb());
        failedQueue = [];
        return api(originalRequest);
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

export default api;
