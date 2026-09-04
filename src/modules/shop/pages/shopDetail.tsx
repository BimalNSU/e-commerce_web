import { useParams } from "react-router-dom";
import { useShop } from "../hooks/useShop";
import Loading from "../../../components/loading";
import {
  App,
  Button,
  Card,
  Empty,
  FormInstance,
  Result,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import ShopForm from "./components/ShopForm";
import { Shop } from "../types/shop.types";
import { EditOutlined } from "@ant-design/icons";
import ShopView from "./components/ShopView";
import { useUpdateShop } from "../hooks/useUpdateShop";
const { Text } = Typography;

const ShopDetail = () => {
  const { modal, notification } = App.useApp();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { id } = useParams();
  const shopId = Number(id);
  const { mutateAsync: updateShop, isPending } = useUpdateShop();

  const { data, isLoading, isError } = useShop(shopId);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Result status="error" />;
  }
  if (!data) {
    return <Empty />;
  }
  const onSubmit = async (values: Omit<Shop, "id">, form: FormInstance) => {
    modal.confirm({
      title: "Are you sure to update shop?",
      async onOk() {
        try {
          await updateShop({ id: shopId, data: values });
          form.resetFields();
          setIsEditMode(false);
          notification.success({ title: "Shop is updated successfully" });
        } catch (e: any) {
          const errors: Record<string, string> = e.response.data.errors;
          if (Object.keys(errors).length) {
            form.setFields(
              Object.entries(errors).map(([key, value]) => ({
                name: key,
                errors: [value],
              })),
            );
          }
          notification.error({ title: "Fail to update" });
        }
      },
    });
  };
  const handleCancel = () => {
    setIsEditMode(false);
  };

  return (
    <>
      {!isEditMode ? (
        <Card
          title={
            <Space orientation="horizontal">
              <Text>Shop Info</Text>
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </Button>
            </Space>
          }
        >
          <ShopView shop={data} />
        </Card>
      ) : (
        <ShopForm
          initialValues={data}
          onFinish={onSubmit}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};
export default ShopDetail;
