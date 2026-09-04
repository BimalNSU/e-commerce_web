import {
  Table,
  Typography,
  TableProps,
  Row,
  Col,
  Space,
  Avatar,
  Dropdown,
  Modal,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Shop } from "../../types/shop.types";

import { DATE_TIME_FORMAT } from "../../../../shared/constants/date-format";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../../../auth/auth.store";
import dayjs from "dayjs";
const { Text } = Typography;
const { confirm } = Modal;
type ShopTableProps = {
  data: Shop[];
  isLoading: boolean;
  searchTerm?: string | null;
};

const ShopTable = ({ data, isLoading, searchTerm }: ShopTableProps) => {
  const { user } = useAuthStore();
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

  const handleRemoveShop = async (e: any, record: Shop) => {
    confirm({
      title: `Are you sure you want to delete this shop?`,
      async onOk() {
        try {
          //   await customerService.softDelete(record.id, authUserId);
        } catch (err) {
          notification.error({ title: "Delete failed" });
        }
      },
    });
  };
  const handleRestoreShop = async (e: any, record: Shop) => {
    confirm({
      title: `Are you sure, want to restore this shop?`,
      async onOk() {
        try {
          //   await customerService.restore(record.id, authUserId);
        } catch (err) {
          notification.error({ title: "Restore failed" });
        }
      },
    });
  };

  const renderActionItems = (record: Shop) => {
    const arr = [];
    // if (record.isDeleted) {
    //   arr.push({
    //     key: "1",
    //     label: <span style={{ fontSize: 14 }}>{"Restore"}</span>,
    //     icon: (
    //       <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 20 }} />
    //     ),
    //     onClick: (e: any) => handleRestoreShop(e, record),
    //   });
    // } else {
    arr.push({
      key: "1",
      label: <span style={{ fontSize: 14 }}>{"Delete"}</span>,
      icon: <DeleteOutlined />,
      onClick: (e: any) => handleRemoveShop(e, record),
      danger: true,
    });
    // }
    return arr;
  };
  const renderValueCell = (text: any, record: any) => (
    <Link
      to={{ pathname: `/admin/shops/${record.id}` }}
      style={{ textDecoration: "none" }}
    >
      {record.isDeleted ? <Text type="danger">{text}</Text> : text}
    </Link>
  );
  const columns: TableProps<Shop>["columns"] = [
    {
      key: "mobileView",
      render: (_, record) => (
        <div
          onClick={() => navigate(`/admin/shops/${record.id}`)}
          style={{ cursor: "pointer" }}
        >
          <Row justify="space-between" align="top">
            <Col flex="auto">
              <Space align="start">
                <Avatar icon={<UserOutlined />} />

                <div>
                  <div style={{ fontWeight: 600 }}>
                    {highlightText(record.name, searchTerm)}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "#8c8c8c",
                      marginTop: 2,
                    }}
                  >
                    #{record.id} ·{" "}
                    {dayjs(record.createdAt).format(DATE_TIME_FORMAT)}
                  </div>
                </div>
              </Space>
            </Col>

            {/* <Col>
              <Tag color={StaffStatus.KEYS[record.status].color}>
                {StaffStatus.KEYS[record.status].text}
              </Tag>
            </Col> */}
          </Row>

          <div style={{ marginTop: 12 }}>
            <Text strong>{`Address: `}</Text>
            {record.address}
          </div>
        </div>
      ),
      responsive: ["xs"],
    },
    {
      title: "Created",
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
      title: "Name",
      dataIndex: "name",
      render: (text, record) =>
        renderValueCell(highlightText(text, searchTerm), record),
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text, record) => text && renderValueCell(text, record),
      responsive: ["md", "lg", "xl", "xxl"],
    },
  ];
  if (user?.isAdmin) {
    columns.push({
      title: "Action",
      dataIndex: "action",
      align: "center",
      width: 90,

      fixed: "right",
      // width: "25%",
      render: (_, record) => (
        <Space size="middle">
          <div
            style={{
              padding: "3px",
              position: "relative",
              backgroundColor: "#fff",
              border: "1px solid #d9d9d9",
              borderRadius: "2px",
            }}
          >
            <Dropdown menu={{ items: renderActionItems(record) }}>
              <a style={{ color: "black", textDecoration: "none" }}>
                Select <DownOutlined />
              </a>
            </Dropdown>
          </div>
        </Space>
      ),
      responsive: ["md", "lg", "xl", "xxl"],
    });
  }
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
export default ShopTable;
