import { Descriptions } from "antd";
import { Shop } from "../../types/shop.types";
type ShopViewProps = {
  shop: Omit<Shop, "id">;
};

const ShopView = ({ shop }: ShopViewProps) => {
  const items = [
    { key: "name", label: "Name", children: shop.name },
    { key: "address", label: "Address", children: shop.address || "N/A" },
  ];

  return (
    <Descriptions
      column={1}
      // title={`User Info`}
      size="small"
      // extra={
      //   <Button onClick={onEdit} type="text">
      //     <EditOutlined />
      //   </Button>
      // }
      items={items}
    />
  );
};
export default ShopView;
