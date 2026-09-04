import api from "../../shared/api/api";
import { User } from "../users/types/user.types";
import { LoginResponse } from "./auth.types";

export const loginApi = async (payload: {
  loginId: string;
  password: string;
}) => {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  if (res.status !== 201) {
    throw new Error();
  }
  return res;
};

export const getMeApi = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const logoutApi = async () => {
  const res = await api.post("/auth/logout");
  if (res.status !== 200) {
    throw new Error();
  }
  return res;
};

export const registerCustomer = async (
  data: Omit<User, "id" | "isAdmin" | "isRevoked">,
) => {
  const res = await api.post("/auth/register/customer", data);
  // if (res.status !== 201) {
  //   throw new Error();
  // }
  return res.data;
};

export const forgetPasswordApi = async () => {
  const res = await api.post("/auth/forgot-password");
  if (res.status !== 200) {
    throw new Error();
  }
  return res;
};
export const resetPasswordApi = async (
  data: Partial<Pick<User, "mobile" | "email">> & {
    token: string; //OTP
    newPassword: string;
  },
) => {
  const res = await api.post("/auth/reset-password", data);
  // if (res.status !== 201) {
  //   throw new Error();
  // }
  return res.data;
};

export const getPermissionsApi = async (): Promise<string[]> => {
  const res = await api.get("/auth/permissions");
  return res.data;
};
