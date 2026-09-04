import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShop } from "../api/shop.api";
import { shopsKeys } from "../api/shop.query";
import { Shop } from "../types/shop.types";

type UpdateShopVariables = {
  id: number;
  data: Omit<Shop, "id">;
};

export const useUpdateShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateShopVariables) => updateShop(id, data),

    onSuccess: async (_, variables) => {
      const updatedShop: Shop = {
        id: variables.id,
        ...variables.data,
      };

      // Update detail cache
      queryClient.setQueryData<Shop>(
        shopsKeys.detail(variables.id),
        (currentShop) => ({ ...currentShop, ...updatedShop }),
      );

      // Update all shop list caches
      queryClient.setQueriesData<PaginatedData<Shop>>(
        { queryKey: shopsKeys.lists() },
        (current) => {
          if (!current) return current;

          return {
            ...current,
            data: current.data.map((shop) =>
              shop.id === updatedShop.id ? { ...shop, ...updatedShop } : shop,
            ),
          };
        },
      );
    },
  });
};
