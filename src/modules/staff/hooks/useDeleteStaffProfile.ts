import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStaffProfile } from "../api/staffs.api";
import { staffProfilesKeys } from "../api/staffs.query";

export function useDeleteStaffProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return deleteStaffProfile(id);
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: staffProfilesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: staffProfilesKeys.detail(id) });
    },
  });
}
