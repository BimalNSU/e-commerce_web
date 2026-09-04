import { useQuery } from "@tanstack/react-query";
import { rolesApi } from "../api/roles.api";

export function useRoleOptions() {
  return useQuery({
    queryKey: ["roles", "options"],
    queryFn: rolesApi.getOptions,
    staleTime: 5 * 60 * 1000,
  });
}
