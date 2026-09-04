import { FormInstance, Modal, notification } from "antd";
import { createShop } from "../api/shop.api";
import { Shop } from "../types/shop.types";
import ShopForm from "./components/ShopForm";
const { confirm } = Modal;

const ShopCreatePage = () => {
  const onSubmit = async (values: Omit<Shop, "id">, form: FormInstance) => {
    confirm({
      title: "Are you sure to create shop?",
      async onOk() {
        try {
          await createShop(values);
          form.resetFields();
          notification.success({ title: "Shop created successfully" });
        } catch (err: any) {
          notification.error({ title: "Fail to create shop" });
        }
      },
    });
  };
  return <ShopForm onFinish={onSubmit} />;
};
export default ShopCreatePage;
