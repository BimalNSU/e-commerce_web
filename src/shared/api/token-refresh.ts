import axios from "axios";
import { useAuthStore } from "../../modules/auth/auth.store";
import { ERROR_CODES } from "../constants/error-codes";

let refreshPromise: Promise<string> | null = null;

export async function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    const baseUrl = (import.meta as any).env.VITE_API_BASE_URL;
    refreshPromise = axios
      .post(`${baseUrl}/auth/refresh`, {}, { withCredentials: true })
      .then((res) => {
        const token = res.data.accessToken;
        const currentUser = useAuthStore.getState().user;
        useAuthStore.getState().setAuth(token, currentUser);

        return token;
      })
      .catch((err) => {
        const errorCode = err?.response?.data?.error;

        // ONLY logout for auth-related failures
        if (errorCode === ERROR_CODES.REFRESH_INVALID) {
          useAuthStore.getState().clearAuth();
        }
        if (!err.response) {
          console.warn("Network error during refresh");
        }
        throw err; // Otherwise just propagate error (network issue etc.)
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}
