import { StaffProfileFilters } from "../types/staff.types";

export const staffProfilesKeys = {
  all: ["staffProfiles"] as const,
  lists: () => [...staffProfilesKeys.all, "list"] as const,
  list: (filters: StaffProfileFilters) =>
    [...staffProfilesKeys.lists(), filters] as const,

  detail: (id: number) => [...staffProfilesKeys.all, id] as const,
};
