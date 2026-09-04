import api from "../../../shared/api/api";
import { Shop, ShopFilters, ShopOption, ShopId } from "../types/shop.types";

//TODO: check this function
export const createShop = async (data: Omit<Shop, "id">) => {
  const res = await api.post("/shops", data);
  // if (res.status !== 201) {
  //   throw new Error();
  // }
  return res.data;
};

export const getShop = async (id: number) => {
  const response = await api.get<Shop>(`/shops/${id}`);
  return response.data;
};

export const getShops = async (
  filters: ShopFilters,
): Promise<PaginatedResponse<Shop>> => {
  const response = await api.get("/shops/paginated", {
    params: {
      page: filters.page,
      limit: filters.limit,
      // ...(filters.status && { status: filters.status }),
      ...(filters.name && { search: filters.name }),
    },
  });

  return response.data;
};

export const shopsApi = {
  async getOptions(search: string) {
    const { data } = await api.get<ShopOption[]>("/shops/options", {
      params: { search },
    });
    return data;
  },
};

export const updateShop = async (id: ShopId, data: Omit<Shop, "id">) => {
  const res = await api.patch(`/shops/${id}`, {
    name: data.name,
    address: data.address || null, //null means address will remove
  });
  // if (res.status !== 200) {
  //   throw new Error();
  // }
  return res.data;
};
