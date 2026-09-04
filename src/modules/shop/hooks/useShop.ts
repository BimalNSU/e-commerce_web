import { useQuery } from "@tanstack/react-query";
import { getShop } from "../api/shop.api";
import { shopsKeys } from "../api/shop.query";

export const useShop = (id?: number) =>
  useQuery({
    queryKey: shopsKeys.detail(id || 0),
    enabled: !!id, //only call if id is truthy
    queryFn: async () => {
      const result = await getShop(id!);
      return result;
    },
  });
