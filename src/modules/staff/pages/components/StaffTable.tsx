import {
  Table,
  Typography,
  TableProps,
  Tag,
  Row,
  Col,
  Space,
  Avatar,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { StaffProfile, StaffProfileListItem } from "../../types/staff.types";
import { StaffStatus } from "../../constant/staff.contant";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "../../../../shared/constants/date-format";
import { UserOutlined } from "@ant-design/icons";
const { Text } = Typography;
type StaffTableProps = {
  data: StaffProfileListItem[];
  isLoading: boolean;
  searchTerm?: string | null;
};
type StaffStatusValue = 1 | 2 | 3;

const StaffTable = ({ data, isLoading, searchTerm }: StaffTableProps) => {
  const navigate = useNavigate();
  const highlightText = (text: string, search?: string | null) => {
    if (!search) {
      return text;
    }
    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: "yellow" }}>
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  const renderValueCell = (text: any, record: any) => (
    <Link
      to={{ pathname: `/admin/staff-profiles/${record.id}` }}
      style={{ textDecoration: "none" }}
    >
      {record.isDeleted ? <Text type="danger">{text}</Text> : text}
    </Link>
  );
  const columns: TableProps<StaffProfileListItem>["columns"] = [
    {
      key: "mobileView",
      render: (_, record) => (
        <div
          onClick={() => navigate(`/admin/staff-profiles/${record.id}`)}
          style={{ cursor: "pointer" }}
        >
          <Row justify="space-between" align="top">
            <Col flex="auto">
              <Space align="start">
                <Avatar icon={<UserOutlined />} />

                <div>
                  <div style={{ fontWeight: 600 }}>
                    {highlightText(record.user.firstName, searchTerm)}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "#8c8c8c",
                      marginTop: 2,
                    }}
                  >
                    #{record.id} · {record.employeeCode}
                  </div>
                </div>
              </Space>
            </Col>

            <Col>
              <Tag color={StaffStatus.KEYS[record.status].color}>
                {StaffStatus.KEYS[record.status].text}
              </Tag>
            </Col>
          </Row>

          <div style={{ marginTop: 12 }}>
            <Text strong>Mobile:</Text>{" "}
            <a href={`tel:${record.user.mobile}`}>
              {highlightText(record.user.mobile, searchTerm)}
            </a>
          </div>

          <div style={{ marginTop: 6 }}>
            <Text strong>Department:</Text> {record.department || "N/A"}
          </div>

          <div style={{ marginTop: 6 }}>
            <Text strong>Designation:</Text> {record.designation || "N/A"}
          </div>

          <div style={{ marginTop: 6 }}>
            <Text strong>Role:</Text> {record.role?.name || "N/A"}
          </div>

          <div style={{ marginTop: 6 }}>
            <Text strong>Shop:</Text> {record.shop?.name || "N/A"}
          </div>

          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              color: "#8c8c8c",
            }}
          >
            Created: {dayjs(record.createdAt).format(DATE_TIME_FORMAT)}
          </div>
        </div>
      ),
      responsive: ["xs"],
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) =>
        renderValueCell(dayjs(text).format(DATE_TIME_FORMAT), record),
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "#",
      dataIndex: "id",
      render: renderValueCell,
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Employee Code",
      dataIndex: "employeeCode",
      render: (text, record) =>
        renderValueCell(highlightText(text, searchTerm), record),
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Department",
      dataIndex: "department",
      render: (text, record) =>
        text && renderValueCell(highlightText(text, searchTerm), record),
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Designation",
      dataIndex: "designation",
      render: (text, record) =>
        text && renderValueCell(highlightText(text, searchTerm), record),
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: StaffStatusValue, record) => {
        const statusTag = (
          <Tag color={StaffStatus.KEYS[text].color}>
            {StaffStatus.KEYS[text].text}
          </Tag>
        );
        return renderValueCell(statusTag, record);
      },
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "User Name",
      render: (_, record) => (
        <Link
          to={{ pathname: `/admin/users/${record.user.id}` }}
          style={{ textDecoration: "none" }}
        >
          {record.user.firstName}
        </Link>
      ),
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "User Mobile",
      render: (_, record) => (
        <Link
          to={{ pathname: `/admin/users/${record.user.id}` }}
          style={{ textDecoration: "none" }}
        >
          {record.user.mobile}
        </Link>
      ),
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Role",
      render: (_, record) => (
        <Link
          to={{ pathname: `/admin/roles/${record.role.id}` }}
          style={{ textDecoration: "none" }}
        >
          {record.role.name}
        </Link>
      ),
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Shop",
      render: (_, record) => (
        <Link
          to={{ pathname: `/admin/shops/${record.shop.id}` }}
          style={{ textDecoration: "none" }}
        >
          {record.shop.name}
        </Link>
      ),
      responsive: ["md", "lg", "xl", "xxl"],
    },
  ];
  return (
    <Table
      size="small"
      loading={isLoading}
      dataSource={data}
      rowKey="id"
      pagination={false}
      columns={columns}
    />
  );
};
export default StaffTable;
