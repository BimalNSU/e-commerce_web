import { useQuery } from "@tanstack/react-query";
import { shopsApi } from "../api/shop.api";

export function useShopOptions(search: string) {
  return useQuery({
    queryKey: ["shops", "options", search],
    queryFn: () => shopsApi.getOptions(search),
    enabled: search.length >= 2,
    staleTime: 30_000,
  });
}
