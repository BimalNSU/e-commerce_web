import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateStaffProfile } from "../api/staffs.api";
import { staffProfilesKeys } from "../api/staffs.query";
import { StaffProfileFormValues } from "../types/staff.types";

export function useCreateStaffProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: StaffProfileFormValues) => {
      return CreateStaffProfile({
        employeeCode: data.employeeCode,
        department: data.department,
        designation: data.designation,
        assignDate: data.assignDate.toDate(),
        userId: data.user.id,
        roleId: data.role.id,
        shopId: data.shop.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffProfilesKeys.lists() });
    },
  });
}
