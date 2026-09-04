import { useQuery } from "@tanstack/react-query";
import { getStaffProfiles } from "../api/staffs.api";
import { staffProfilesKeys } from "../api/staffs.query";
import { StaffProfileFilters } from "../types/staff.types";

export const usePaginatedStaffs = (filters: StaffProfileFilters) => {
  return useQuery({
    queryKey: staffProfilesKeys.list(filters),
    queryFn: async () => {
      const result = await getStaffProfiles(filters);
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
