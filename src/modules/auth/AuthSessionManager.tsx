import { useCallback, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "./auth.store";
import { validateAccessToken } from "./auth-session";

const REFRESH_CHECK_BUFFER = 30_000;

const AuthSessionManager = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const validationPromiseRef = useRef<Promise<boolean> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearValidationTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const validate = useCallback(async (): Promise<boolean> => {
    if (validationPromiseRef.current) {
      return validationPromiseRef.current;
    }
    const promise = validateAccessToken();
    validationPromiseRef.current = promise;
    try {
      return await promise;
    } finally {
      validationPromiseRef.current = null;
    }
  }, []);

  const scheduleValidation = useCallback(() => {
    clearValidationTimer();
    const currentToken = useAuthStore.getState().accessToken;
    if (!currentToken) {
      return;
    }

    try {
      const { exp } = jwtDecode(currentToken);
      if (!exp) {
        return;
      }

      const expiresAt = exp * 1000;
      const now = Date.now();
      const delay = Math.max(expiresAt - now - REFRESH_CHECK_BUFFER, 0);
      timerRef.current = setTimeout(() => {
        void validate();
      }, delay);
    } catch {
      clearValidationTimer();
    }
  }, [clearValidationTimer, validate]);

  useEffect(() => {
    if (!accessToken) {
      clearValidationTimer();
      return;
    }

    // Validate immediately when:
    // - application starts
    // - access token changes
    void validate();
    scheduleValidation(); // Schedule next validation based on token expiry

    //when tab focus
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        return;
      }
      console.log("Check: tab focus");
      void validate();
    };

    //when window focus
    const handleFocus = () => {
      console.log("Check: window focus");
      void validate();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      clearValidationTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [accessToken, validate, scheduleValidation, clearValidationTimer]);

  return null;
};

export default AuthSessionManager;
