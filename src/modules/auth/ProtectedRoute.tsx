import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "./auth.store";
import { refreshAccessToken } from "../../shared/api/token-refresh";
import { ERROR_CODES } from "../../shared/constants/error-codes";
import { Result } from "antd";
import Loading from "../../components/loading";

interface Props {
  children: ReactNode;
  requiredPermissions?: string[];
  adminOnly?: boolean;
  userType?: 1 | 2 | 3;
}
type SessionStatus = "checking" | "authenticated" | "unauthenticated" | "error";

const ProtectedRoute = ({
  children,
  requiredPermissions,
  adminOnly = false,
  userType,
}: Props) => {
  const { accessToken, user, isLogOut } = useAuthStore();
  const location = useLocation();
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>(
    accessToken ? "authenticated" : "checking",
  );

  useEffect(() => {
    if (isLogOut) {
      return;
    }
    if (accessToken) {
      setSessionStatus("authenticated");
      return;
    }

    //  No access token and we're NOT logging out. Try to restore using the refresh-token cookie.
    let cancelled = false;
    const restoreSession = async () => {
      try {
        setSessionStatus("checking");
        await refreshAccessToken();
        if (!cancelled) {
          setSessionStatus("authenticated");
        }
      } catch (error: any) {
        if (cancelled) {
          return;
        }
        const errorCode = error?.response?.data?.error;
        if (errorCode !== ERROR_CODES.REFRESH_INVALID) {
          setSessionStatus("error");
        }
      }
    };
    void restoreSession();

    return () => {
      cancelled = true;
    };
  }, [accessToken, isLogOut]);

  if (isLogOut) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Still checking refresh session.
  if (sessionStatus === "checking") {
    return <Loading />;
  }

  // Temporary server/network problem.
  if (sessionStatus === "error") {
    return (
      <Result
        status="500"
        title="Network Error"
        subTitle="Unable to connect to the server. Please check your internet connection and try again."
        // extra={
        //   <Button type="primary" onClick={handleRetry}>
        //     Retry
        //   </Button>
        // }
      />
    );
  }

  // Admin only route
  if ((adminOnly && !user?.isAdmin) || (userType && userType !== user?.type)) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
