import { useQuery } from "@tanstack/react-query";
import { staffProfilesKeys } from "../api/staffs.query";
import { getStaffProfile } from "../api/staffs.api";

export const useStaffProfile = (id: number) =>
  useQuery({
    queryKey: staffProfilesKeys.detail(id),
    enabled: !!id, //only call if id is truthy
    queryFn: async () => {
      const result = await getStaffProfile(id);
      return result;
    },
  });
