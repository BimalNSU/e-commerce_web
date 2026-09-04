export type UserId = string;
export interface User {
  id: UserId;
  type: 1 | 2 | 3;
  isAdmin: boolean;
  firstName: string;
  lastName?: string;
  mobile: string;
  email?: string;
  isRevoked: boolean;
}

export interface UserFilters {
  page: number;
  limit: number;
  type?: number; // 1: Staff, 2: Customer, 3: Vendor
  status?: number; //1: active, 2: revoke
  search?: string;
}

export interface UserOption
  extends Pick<User, "id" | "firstName" | "lastName" | "mobile"> {}
