import { useQuery } from "@tanstack/react-query";
import { getShops } from "../api/shop.api";
import { shopsKeys } from "../api/shop.query";
import { ShopFilters } from "../types/shop.types";

export const usePaginatedShops = (filters: ShopFilters) => {
  return useQuery({
    queryKey: shopsKeys.list(filters),
    queryFn: async () => {
      const result = await getShops(filters);
      const pageCount = Math.ceil(result.itemCount / filters.limit);
      return {
        data: result.data,
        meta: {
          ...filters,
          itemCount: result.itemCount,
          pageCount,
          hasNextPage: filters.page < pageCount,
          hasPreviousPage: filters.page > 1,
        },
      };
    },
    // keepPreviousData: true, //But it's deprecated
    placeholderData: (previousData) => previousData,
  });
};
