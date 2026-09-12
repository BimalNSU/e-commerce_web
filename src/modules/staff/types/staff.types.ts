import dayjs from "dayjs";
import { UserId, UserOption } from "../../users/types/user.types";
import { ShopId, ShopOption } from "../../shop/types/shop.types";
import { RoleId } from "../../roles/types/role.types";
import { RoleOption } from "../../roles/api/roles.api";

export interface StaffProfileFilters {
  page: number;
  limit: number;
  status?: number; //1: Active, 2: "Inactive", 3: "Suspended"
  search?: string;
}

export enum StaffStatus {
  Active = 1,
  Inactive = 2,
  Suspended = 3,
}
export interface StaffProfile {
  id: number;

  employeeCode: string;
  department: string;
  designation: string;
  assignDate: Date;
  status: StaffStatus;

  createdAt: Date;

  userId: UserId;
  roleId: RoleId;
  shopId: ShopId;

  // user: UserOption;
  // role: RoleOption;
  // shop: ShopOption;
}
export interface StaffProfileFormValues
  extends Pick<
    StaffProfile,
    "id" | "employeeCode" | "department" | "designation" | "status"
  > {
  assignDate: dayjs.Dayjs;
  shop: ShopOption;
  user: UserOption;
  role: RoleOption;
}

export interface UpdateStaffProfilePayload
  extends Omit<StaffProfile, "id" | "createdAt"> {}

export interface StaffProfileDetail
  extends Pick<
    StaffProfile,
    | "id"
    | "employeeCode"
    | "department"
    | "designation"
    | "status"
    | "createdAt"
  > {
  assignDate: Date;

  shop: ShopOption;
  user: UserOption;
  role: RoleOption;
}

export interface StaffProfileListItem
  extends Omit<StaffProfile, "userId" | "roleId" | "shopId"> {
  user: UserOption;
  role: RoleOption;
  shop: ShopOption;
}
