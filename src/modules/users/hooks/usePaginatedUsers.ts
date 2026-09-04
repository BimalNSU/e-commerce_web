import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users.api";
import { usersKeys } from "../api/users.query";
import { UserFilters } from "../types/user.types";

export const usePaginatedUsers = (filters: UserFilters) => {
  return useQuery({
    queryKey: usersKeys.list(filters),
    queryFn: async () => {
      const result = await getUsers(filters);
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
