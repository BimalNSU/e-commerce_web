import {
  SearchOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
type TableFilterBarProps = {
  initialValues?: {
    type?: number;
    status?: number;
    searchTerm?: string | null;
  };
  onSearch: (values: { status?: number; searchTerm?: string }) => void;
};

const UserFilterBar = ({ initialValues, onSearch }: TableFilterBarProps) => {
  return (
    <Form initialValues={initialValues} onFinish={onSearch}>
      <Row gutter={[16, 1]}>
        <Col>
          <Form.Item label="Type" name="type">
            <Select
              style={{ width: "150px" }}
              // placeholder={pmsMenu.dropDownName}
              // onSelect={onSelectFilterType}
              // onDeselect={onDelectFilterType}
              options={[
                { value: 0, label: <span>Any</span> },
                {
                  value: 1,
                  label: (
                    <>
                      <TeamOutlined /> Staff
                    </>
                  ),
                },
                {
                  value: 2,
                  label: (
                    <>
                      <UserOutlined /> Customer
                    </>
                  ),
                },
                {
                  value: 3,
                  label: (
                    <>
                      <ShopOutlined /> Vendor
                    </>
                  ),
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Status" name="status">
            <Select
              style={{ width: "150px" }}
              // placeholder={pmsMenu.dropDownName}
              // onSelect={onSelectFilterType}
              // onDeselect={onDelectFilterType}
              options={[
                { value: 0, label: <span>Any</span> },
                {
                  value: 1,
                  label: <span style={{ color: "#52c41a" }}>Active</span>,
                },
                {
                  value: 2,
                  label: <span style={{ color: "#ff4d4f" }}>Revoked</span>,
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="searchTerm">
            <Input
              allowClear
              width={100}
              // className="header-search"
              placeholder="Type here..."
              prefix={<SearchOutlined />}
              // onChange={onChangeInput}
            />
          </Form.Item>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default UserFilterBar;
