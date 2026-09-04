import api from "../../../shared/api/api";
import { User, UserFilters, UserOption } from "../types/user.types";

export const getUsers = async (
  filters: UserFilters,
): Promise<PaginatedResponse<User>> => {
  const response = await api.get("/users/paginated", {
    params: {
      page: filters.page,
      limit: filters.limit,
      ...(filters.type && { type: filters.type }),
      ...(filters.status && { status: filters.status }),
      ...(filters.search && { search: filters.search }),
    },
  });

  return response.data;
};

export const usersApi = {
  async getOptions(search: string) {
    const { data } = await api.get<UserOption[]>("/users/options", {
      params: { search },
    });
    return data;
  },
};

export const getUser = async (id: string) => {
  const response = await api.get<User>(`/users/${id}`);

  return response.data;
};

//TODO: check this function
export const createUserByAdmin = async (
  data: Omit<User, "id" | "isRevoked">,
) => {
  const res = await api.post("/users", data);
  // if (res.status !== 201) {
  //   throw new Error();
  // }
  return res.data;
};
export const updateUserByAdmin = async (
  id: string,
  data: Omit<User, "id" | "isRevoked">,
) => {
  const res = await api.patch(`/users/${id}`, {
    type: data.type,
    isAdmin: data.isAdmin,
    firstName: data.firstName,
    lastName: data.lastName || null, //null means last name will remove
    mobile: data.mobile,
    email: data.email || null, //null means email will remove
  });
  // if (res.status !== 201) {
  //   throw new Error();
  // }
  return res.data;
};

export const resetMyPasswordApi = async (
  data: Partial<Pick<User, "mobile" | "email">> & {
    token: string; //OTP
    newPassword: string;
  },
) => {
  const res = await api.patch("/profiles/me/password", data);
  // if (res.status !== 201) {
  //   throw new Error();
  // }
  return res.data;
};

export const updateMyProfileApi = async (): Promise<string[]> => {
  const res = await api.patch("/profiles/me");
  return res.data;
};
