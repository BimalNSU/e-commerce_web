import axios from "axios";
import { useAuthStore } from "../store/auth.store";
import { getNewAccessToken } from "./token-refresh";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest: any = error.config;

    if (error.response?.status !== 401) return Promise.reject(error);
    if (originalRequest._retry) return Promise.reject(error);

    originalRequest._retry = true;

    try {
      const newToken = await getNewAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch {
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }
  }
);

export default api;
