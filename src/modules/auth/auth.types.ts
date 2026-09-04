import { Role } from "../roles/types/role.types";
import { Shop } from "../shop/types/shop.types";
import { User, UserId } from "../users/types/user.types";

export interface LoginRequest {
  email: string;
  password: string;
}
export interface AuthUser
  extends Pick<User, "id" | "firstName" | "lastName" | "type"> {
  isAdmin?: boolean;
  staffProfile?: {
    role: Pick<Role, "id" | "name"> & { permissions: string[] };
    shop: Pick<Shop, "id" | "name">;
  };
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export interface MeResponse {
  userId: string;
  role: string;
  shopId?: string;
}

export interface RefreshResponse {
  accessToken: string;
}
