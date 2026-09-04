import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../api/users.api";

export function useUserOptions(search: string) {
  return useQuery({
    queryKey: ["users", "options", search],
    queryFn: () => usersApi.getOptions(search),
    enabled: search.length >= 2,
    staleTime: 30_000,
  });
}
