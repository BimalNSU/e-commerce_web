import { ServerSearchSelect } from "../../../shared/components/ServerSearchSelect";
import { useShopOptions } from "../hooks/useShopOptions";
import { ShopId, ShopOption } from "../types/shop.types";

interface ShopSelectProps {
  value?: ShopId;
  initialOption?: ShopOption;
  // onChange?: (value: number | string) => void;
  onChange?: (shop?: ShopOption) => void;
}

export function ShopSelect({
  value,
  initialOption,
  onChange,
}: ShopSelectProps) {
  return (
    <ServerSearchSelect
      // value={value}
      initialOption={initialOption}
      onChange={onChange}
      searchQuery={useShopOptions}
      getOptionValue={(shop) => shop.id}
      getOptionLabel={(shop) => shop.name}
      placeholder="Search shop..."
    />
  );
}
