import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/users.api";
import { usersKeys } from "../api/users.query";

export const useUser = (id?: string) =>
  useQuery({
    queryKey: usersKeys.detail(id ?? ""),
    enabled: !!id, //only call if id is truthy
    queryFn: async () => {
      const result = await getUser(id!);
      return result;
    },
  });
