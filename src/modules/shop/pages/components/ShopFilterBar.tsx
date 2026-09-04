import { Button, Form, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import * as validator from "../../../../shared/utils/validation";
type TableFilterBarProps = {
  initialValues?: {
    searchTerm?: string | null;
  };
  onSearch: (values: { searchTerm?: string }) => void;
};

const ShopFilterBar = ({ initialValues, onSearch }: TableFilterBarProps) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="inline"
      initialValues={initialValues}
      onFinish={onSearch}
      style={{ marginBottom: 8 }}
    >
      <Form.Item
        name="searchTerm"
        style={{ marginBottom: 0 }}
        rules={[
          {
            whitespace: true,
            message: validator.BLANK_SPACE_MESSAGE,
          },
        ]}
      >
        <Input
          allowClear
          placeholder="Search by shop name"
          prefix={<SearchOutlined />}
          style={{ width: 250 }}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ShopFilterBar;
