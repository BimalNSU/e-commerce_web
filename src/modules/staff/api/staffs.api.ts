import api from "../../../shared/api/api";
import {
  StaffProfileListItem,
  StaffProfile,
  StaffProfileFilters,
  StaffProfileFormValues,
  StaffProfileDetail,
  UpdateStaffProfilePayload,
} from "../types/staff.types";

export const getStaffProfiles = async (filters: StaffProfileFilters) => {
  const response = await api.get<PaginatedResponse<StaffProfileListItem>>(
    "/staff-profiles/paginated",
    {
      params: {
        page: filters.page,
        limit: filters.limit,
        ...(filters.status && { status: filters.status }),
        ...(filters.search && { search: filters.search }),
      },
    },
  );

  return response.data;
};
export const getStaffProfile = async (id: number) => {
  const response = await api.get<StaffProfileDetail>(`/staff-profiles/${id}`);
  return response.data;
};

export const CreateStaffProfile = async (
  data: Omit<StaffProfile, "id" | "status" | "createdAt">,
) => {
  const res = await api.post("/staff-profiles", data);
  // if (res.status !== 201) {
  //   throw new Error();
  // }
  return res.data;
};
export const updateStaffProfile = async (
  id: number,
  data: UpdateStaffProfilePayload,
) => {
  const res = await api.patch(`/staff-profiles/${id}`, data);
  // if (res.status !== 200) {
  //   throw new Error();
  // }
  return res.data;
};
export const deleteStaffProfile = async (id: number) => {
  const res = await api.delete(`/staff-profiles/${id}`);
  // if (res.status !== 200) {
  //   throw new Error();
  // }
  return res.data;
};
