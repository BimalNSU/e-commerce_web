import { useMutation, useQueryClient } from "@tanstack/react-query";
import { staffProfilesKeys } from "../api/staffs.query";
import {
  StaffProfileDetail,
  StaffProfileFormValues,
  StaffProfileListItem,
} from "../types/staff.types";
import { updateStaffProfile } from "../api/staffs.api";

type UpdateStaffProfileVariables = {
  id: number;
  data: Omit<StaffProfileFormValues, "id">;
};

export const useUpdateStaffProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateStaffProfileVariables) => {
      const { shop, user, role, assignDate, ...rest } = data;
      return updateStaffProfile(id, {
        ...rest,
        assignDate: assignDate.toDate(),
        shopId: shop.id,
        userId: user.id,
        roleId: role.id,
      });
    },

    onSuccess: (_, variables) => {
      const { assignDate, ...rest } = variables.data;
      const updatedProfile = {
        id: variables.id,
        ...rest,
        assignDate: assignDate.toDate(),
      };

      // Update detail cache
      queryClient.setQueryData<StaffProfileDetail>(
        staffProfilesKeys.detail(variables.id),
        (current) => {
          if (current) {
            return {
              ...current,
              ...updatedProfile,
            };
          }
        },
      );

      // Update all staffprofile list caches
      queryClient.setQueriesData<PaginatedData<StaffProfileListItem>>(
        { queryKey: staffProfilesKeys.lists() },
        (current) => {
          if (!current) return current;

          return {
            ...current,
            data: current.data.map((sProfile) =>
              sProfile.id === updatedProfile.id
                ? {
                    ...sProfile,
                    employeeCode: updatedProfile.employeeCode,
                    department: updatedProfile.department,
                    designation: updatedProfile.designation,
                    assignDate: updatedProfile.assignDate,
                    shop: updatedProfile.shop,
                    user: updatedProfile.user,
                    role: updatedProfile.role,
                  }
                : sProfile,
            ),
          };
        },
      );
    },
  });
};
