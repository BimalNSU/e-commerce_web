import { Navigate } from "react-router-dom";
import { useAuthStore } from "./auth.store";
import { UserType } from "../users/user.types";

interface Props {
  children: React.ReactNode;
  permission: string;
}

const RequirePermission = ({ permission, children }: Props) => {
  const { user } = useAuthStore();

  const customerPermissions = new Array<String>(); //static permissions
  const vendorPermissions = new Array<String>(); //static permissions
  const userPermissions =
    user?.type === UserType.VALUES.Customer
      ? customerPermissions
      : user?.type === UserType.VALUES.Vendor
      ? vendorPermissions
      : user?.type === UserType.VALUES.Staff
      ? user?.staffProfile?.role.permissions || []
      : [];

  // Permission check
  if (userPermissions.includes(permission)) {
    return <Navigate to="/403" replace />;
  }
  return <>{children}</>;
};
export default RequirePermission;
