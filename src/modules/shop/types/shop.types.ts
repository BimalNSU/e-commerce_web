export type ShopId = number;
export interface Shop {
  id: ShopId;
  // status: 1 | 2 | 3; //1: Active, 2: "Inactive", 3: "Suspended"
  name: string;
  address?: string;
  createdAt: Date;
}

export interface ShopFilters {
  page: number;
  limit: number;
  // status?: number; //1: Active, 2: "Inactive", 3: "Suspended"
  name?: string;
}

export interface ShopOption extends Pick<Shop, "id" | "name"> {}
