import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuthStore } from "./auth.store";

interface Props {
  children: ReactNode;
  requiredPermissions?: string[];
  adminOnly?: boolean;
  userType?: 1 | 2 | 3;
}

const ProtectedRoute = ({
  children,
  requiredPermissions,
  adminOnly = false,
  userType,
}: Props) => {
  const { accessToken, user } = useAuthStore();
  const location = useLocation();

  if (!accessToken || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if ((adminOnly && !user?.isAdmin) || (userType && userType !== user?.type)) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
