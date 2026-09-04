import { create } from "zustand";

interface PermissionState {
  permissions: string[];
  setPermissions: (p: string[]) => void;
}

export const usePermissionStore = create<PermissionState>((set) => ({
  permissions: [],
  setPermissions: (permissions) => set({ permissions }),
}));
