import { Table, Typography, TableProps, Tag } from "antd";
import { usePaginatedUsers } from "../hooks/usePaginatedUsers";
import { Link, useSearchParams } from "react-router-dom";
import { User } from "../types/user.types";
import { UserType } from "../user.types";
import TablePagination from "../../../components/TablePagination/TablePagination";
import UserFilterBar from "./components/UserFilterBar";
const { Text } = Typography;
type UserTypeValue = keyof typeof UserType.KEYS;

const UserListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);
  const searchTerm = searchParams.get("q");

  const userTypeStr = searchParams.get("type");
  const userType = userTypeStr ? Number(userTypeStr) : undefined;

  const userStatusStr = searchParams.get("status");
  const userStatus = userStatusStr ? Number(userStatusStr) : undefined;

  const { data, isLoading } = usePaginatedUsers({
    page: currentPage,
    limit: pageSize,
    type: userType,
    status: userStatus,
    ...(searchTerm && { search: searchTerm }),
  });

  const updateUrlParams = (queryFilters: any) => {
    const queryParams = new URLSearchParams(searchParams);

    queryFilters.type
      ? queryParams.set("type", queryFilters.type)
      : queryParams.delete("type");

    queryFilters.status
      ? queryParams.set("status", queryFilters.status)
      : queryParams.delete("status");

    queryFilters.searchTerm
      ? queryParams.set("q", queryFilters.searchTerm)
      : queryParams.delete("q");

    // if (searchable) {
    //   queryParams.set("searchFields", searchable.join(","));
    // } else {
    //   queryParams.delete("searchFields");
    // }
    queryParams.set("page", queryFilters.page);
    queryParams.set("pageSize", queryFilters.pageSize);
    setSearchParams(queryParams, { replace: true });
    // navigate(
    //   { pathname: location.pathname, search: queryParams.toString() },
    //   { replace: true },
    // );
  };

  const handleSubmitSearch = (values: {
    type?: number;
    status?: number;
    searchTerm?: string;
  }) => {
    // const [fromDate, toDate] = values.dateRange || [];
    updateUrlParams({
      page: 1, //default
      pageSize: 10, //default
      type: values.type,
      status: values.status,
      searchTerm: values.searchTerm,
      // fromDate,
      // toDate,
    });
  };
  const handleChangePagination = (page: number, pageSize: number) => {
    updateUrlParams({
      page,
      pageSize,
      type: userType,
      status: userStatus,
      searchTerm,
    });
  };
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
      to={{ pathname: `/admin/users/${record.id}` }}
      style={{
        // color: "black",
        // color: colorText,
        textDecoration: "none",
      }}
    >
      {record.isDeleted ? <Text type="danger">{text}</Text> : text}
    </Link>
  );
  const columns: TableProps<User>["columns"] = [
    {
      title: "#",
      dataIndex: "id",
      render: (text, record) =>
        renderValueCell(highlightText(text, searchTerm), record),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text: UserTypeValue, record) =>
        renderValueCell(UserType.KEYS[text], record),
    },
    {
      title: "Name",
      render: (_, record) =>
        renderValueCell(
          highlightText(
            `${record.firstName}${record.lastName ? record.lastName : ""}`,
            searchTerm,
          ),
          record,
        ),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      render: (text, record) =>
        renderValueCell(highlightText(text, searchTerm), record),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) =>
        text
          ? renderValueCell(highlightText(text, searchTerm), record)
          : undefined,
    },
    {
      title: "Status",
      dataIndex: "isRevoked",
      render: (text, record) => {
        const statusTag = !text ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Revoked</Tag>
        );
        return renderValueCell(statusTag, record);
      },
    },
  ];
  return (
    <>
      <UserFilterBar
        initialValues={{ type: userType, status: userStatus, searchTerm }}
        onSearch={handleSubmitSearch}
      />
      <Table
        size="small"
        loading={isLoading}
        dataSource={data?.data ?? []}
        rowKey="id"
        pagination={false}
        columns={columns}
      />
      <TablePagination
        meta={{
          page: currentPage,
          pageSize,
          itemCount: data?.meta.itemCount || 0,
        }}
        label="users"
        onChange={handleChangePagination}
      />
    </>
  );
};
export default UserListPage;
