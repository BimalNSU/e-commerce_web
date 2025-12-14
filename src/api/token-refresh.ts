import axios from "axios";
import { useAuthStore } from "../store/auth.store";

let refreshPromise: Promise<string> | null = null;

export async function getNewAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post("/auth/refresh", {}, { withCredentials: true })
      .then((res) => {
        const token = res.data.accessToken;
        useAuthStore.getState().setAccessToken(token);
        return token;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}
