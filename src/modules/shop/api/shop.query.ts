import { ShopFilters } from "../types/shop.types";

export const shopsKeys = {
  all: ["shops"] as const,
  lists: () => [...shopsKeys.all, "list"] as const,
  list: (filters: ShopFilters) => [...shopsKeys.lists(), filters] as const,

  detail: (id: number) => [...shopsKeys.all, `${id}`] as const,
};
