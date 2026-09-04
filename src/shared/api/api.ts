import axios from "axios";
import { useAuthStore } from "../../modules/auth/auth.store";
import { refreshAccessToken } from "./token-refresh";
import { ERROR_CODES } from "../constants/error-codes";

const api = axios.create({
  baseURL: (import.meta as any).env.VITE_API_BASE_URL,
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (!error.response) {
      return Promise.reject(error); // Network error → don't logout
    }
    const originalRequest: any = error.config;
    const errorCode = error.response?.data?.error;

    if (errorCode === ERROR_CODES.TOKEN_EXPIRED && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    if (
      errorCode === ERROR_CODES.SESSION_REVOKED ||
      errorCode === ERROR_CODES.INVALID_TOKEN
    ) {
      useAuthStore.getState().clearAuth();
    }

    return Promise.reject(error);
  },
);

export default api;
