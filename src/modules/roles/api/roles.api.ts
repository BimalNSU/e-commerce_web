import api from "../../../shared/api/api";

export interface RoleOption {
  id: number;
  name: string;
}

export const rolesApi = {
  async getOptions() {
    const { data } = await api.get<RoleOption[]>("/roles/options");
    return data;
  },
};
