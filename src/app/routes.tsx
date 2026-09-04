import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../modules/auth/LoginPage";
import ProtectedRoute from "../modules/auth/ProtectedRoute";
import Forbidden from "../pages/Forbidden";
import { lazy } from "react";
import RequirePermission from "../modules/auth/RequirePermission";
import { UserType } from "../modules/users/user.types";
import UserEditPage from "../modules/users/pages/UserEditPage";

const UserCreatePage = lazy(
  () => import("../modules/users/pages/UserCreatePage"),
);
const UserListPage = lazy(() => import("../modules/users/pages/UserListPage"));

const StaffListPage = lazy(
  () => import("../modules/staff/pages/StaffListPage"),
);
const StaffProfileCreatePage = lazy(
  () => import("../modules/staff/pages/StaffProfileCreatePage"),
);

const ShopList = lazy(() => import("../modules/shop/pages/shopList"));
const ShopCreatePage = lazy(
  () => import("../modules/shop/pages/shopCreatePage"),
);
const ShopDetail = lazy(() => import("../modules/shop/pages/shopDetail"));

const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminOrders = lazy(() => import("../pages/admin/AdminOrders"));
const AdminProducts = lazy(() => import("../pages/admin/AdminProducts"));

const StaffLayout = lazy(() => import("../layouts/StaffLayout"));
const StaffDashboard = lazy(() => import("../pages/staff/Dashboard"));
// const StaffOrder = lazy(() => import("../pages/staff/order"));
// import CustomerLayout from "./layouts/CustomerLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        {/* <Route path="users" element={<UserListPage />} /> */}
        <Route path="users">
          <Route index element={<UserListPage />} />
          <Route path="add" element={<UserCreatePage />} />
          <Route path=":id" element={<UserEditPage />} />
        </Route>
        <Route path="shops">
          <Route index element={<ShopList />} />
          <Route path="add" element={<ShopCreatePage />} />
          <Route path=":id" element={<ShopDetail />} />
        </Route>
        <Route path="staff-profiles">
          <Route index element={<StaffListPage />} />
          <Route path="add" element={<StaffProfileCreatePage />} />
          {/* <Route path=":id" element={<StaffProfileDetail />} /> */}
        </Route>
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
      </Route>

      <Route
        path="/staff/*"
        element={
          <ProtectedRoute userType={UserType.VALUES.Staff}>
            <StaffLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StaffDashboard />} />
        {/* <Route
          path="order"
          element={
            <RequirePermission permission="order.view">
              <StaffOrder />
            </RequirePermission>
          }
        /> */}
      </Route>

      {/* Customer */}
      {/* <Route
        path="/customer/*"
        element={
          <ProtectedRoute>
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CustomerDashboard />} />
      </Route> */}

      {/* <Route
        path="/orders"
        element={
          <ProtectedRoute requiredPermissions={["ORDER_VIEW"]}>
            <OrdersPage />
          </ProtectedRoute>
        }
      /> */}

      <Route path="/403" element={<Forbidden />} />
      {/* default redirect */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
