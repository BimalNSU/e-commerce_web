import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "./auth.store";
import { refreshAccessToken } from "../../shared/api/token-refresh";

const REFRESH_THRESHOLD = 30;

export async function validateAccessToken(): Promise<boolean> {
  const accessToken = useAuthStore.getState().accessToken;

  // No access token → nothing to validate
  if (!accessToken) {
    return false;
  }
  try {
    const { exp } = jwtDecode(accessToken);
    if (!exp) {
      return false;
    }
    const now = Math.floor(Date.now() / 1000);

    // Token is still valid and has enough time remaining
    if (exp - now > REFRESH_THRESHOLD) {
      return true;
    }
    await refreshAccessToken(); // Expired or about to expire
    return true;
  } catch {
    return false;
  }
}
