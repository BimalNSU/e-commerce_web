import { ServerSearchSelect } from "../../../shared/components/ServerSearchSelect";
import { useShopOptions } from "../hooks/useShopOptions";
import { ShopOption } from "../types/shop.types";

interface ShopSelectProps {
  value?: ShopOption; //get value automatically from form state
  onChange?: (shop?: ShopOption) => void;
}

const ShopSelect = ({ value, onChange }: ShopSelectProps) => {
  return (
    <ServerSearchSelect
      value={value?.id}
      initialOption={value}
      onChange={onChange}
      searchQuery={useShopOptions}
      getOptionValue={(shop) => shop.id}
      getOptionLabel={(shop) => shop.name}
      placeholder="Search shop..."
    />
  );
};
export default ShopSelect;
