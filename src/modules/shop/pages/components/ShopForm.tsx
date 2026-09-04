import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import * as validator from "../../../../shared/utils/validation";
import { Shop } from "../../types/shop.types";

type ShopFormProps = {
  initialValues?: Omit<Shop, "id">;
  onFinish: (value: Omit<Shop, "id">, form: FormInstance) => void;
  loading?: boolean;
  onCancel?: () => void;
};
const { TextArea } = Input;

const ShopForm = ({
  initialValues,
  onFinish,
  loading = false,
  onCancel,
}: ShopFormProps) => {
  const [form] = Form.useForm<Omit<Shop, "id">>();

  const onReset = () => {
    form.resetFields();
    onCancel?.();
  };

  return (
    <Card title={initialValues ? "Edit Shop" : "Create Shop"}>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => onFinish(values, form)}
        initialValues={{ ...initialValues }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Shop Name"
              name="name"
              rules={[
                { required: true, message: "Enter shop name" },
                { whitespace: true, message: validator.BLANK_SPACE_MESSAGE },
                { max: 50, message: "Shop name cannot exceed 50 characters" },
                {
                  pattern: /^\p{L}+(?:[ ']\p{L}+)*$/u,
                  message:
                    "Shop name can only contain letters, spaces, and apostrophes",
                },
              ]}
            >
              <Input placeholder="Uttara Branch" maxLength={50} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Shop Address"
              name="address"
              rules={[
                { whitespace: true, message: validator.BLANK_SPACE_MESSAGE },
                {
                  max: 50,
                  message: "Shop address cannot exceed 255 characters",
                },
              ]}
            >
              <TextArea
                showCount
                rows={4}
                placeholder="Type here..."
                maxLength={255}
              />
            </Form.Item>
          </Col>
        </Row>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <Button htmlType="button" onClick={onReset} disabled={loading}>
            Cancel
          </Button>
          <Button loading={loading} type="primary" htmlType="submit">
            {initialValues ? "Update Shop" : "Create Shop"}
          </Button>
        </div>
      </Form>
    </Card>
  );
};
export default ShopForm;
