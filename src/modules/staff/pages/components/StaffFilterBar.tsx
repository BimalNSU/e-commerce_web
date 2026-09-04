import { Button, Form, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import * as validator from "../../../../shared/utils/validation";
type TableFilterBarProps = {
  initialValues?: {
    status?: number;
    searchTerm?: string | null;
  };
  onSearch: (values: { status?: number; searchTerm?: string }) => void;
};

const statusStyle = {
  active: {
    color: "#389E0D",
    background: "#F6FFED",
  },
  inactive: {
    color: "#8C8C8C",
    background: "#FAFAFA",
  },
  suspended: {
    color: "#CF1322",
    background: "#FFF1F0",
  },
};

const StaffFilterBar = ({ initialValues, onSearch }: TableFilterBarProps) => {
  return (
    <Form
      layout="inline"
      initialValues={initialValues}
      onFinish={onSearch}
      style={{ marginBottom: 8 }}
    >
      <Form.Item name="status" label="Status" style={{ marginBottom: 0 }}>
        <Select
          style={{ width: 150 }}
          options={[
            { value: 0, label: "Any" },
            {
              value: 1,
              label: (
                <span
                  style={{
                    padding: "2px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    ...statusStyle.active,
                  }}
                >
                  Active
                </span>
              ),
            },
            {
              value: 2,
              label: (
                <span
                  style={{
                    padding: "2px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    ...statusStyle.inactive,
                  }}
                >
                  Inactive
                </span>
              ),
            },
            {
              value: 3,
              label: (
                <span
                  style={{
                    padding: "2px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    ...statusStyle.suspended,
                  }}
                >
                  Suspended
                </span>
              ),
            },
          ]}
        />
      </Form.Item>

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
          placeholder="Search..."
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

export default StaffFilterBar;
