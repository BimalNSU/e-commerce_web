import { usePaginatedStaffs } from "../hooks/usePaginatedStaffs";
import { useSearchParams } from "react-router-dom";
import StaffTable from "./components/StaffTable";
import StaffFilterBar from "./components/StaffFilterBar";
import TablePagination from "../../../components/TablePagination/TablePagination";

const StaffListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);
  const searchTerm = searchParams.get("q");

  const staffStatusStr = searchParams.get("status");
  const staffStatus = staffStatusStr ? Number(staffStatusStr) : undefined;

  const { data, isLoading } = usePaginatedStaffs({
    page: currentPage,
    limit: pageSize,
    status: staffStatus,
    ...(searchTerm && { search: searchTerm }),
  });

  const updateUrlParams = (queryFilters: any) => {
    const queryParams = new URLSearchParams(searchParams);

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
    status?: number;
    searchTerm?: string;
  }) => {
    // const [fromDate, toDate] = values.dateRange || [];
    updateUrlParams({
      page: 1, //default
      pageSize: 10, //default
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
      status: staffStatus,
      searchTerm,
    });
  };

  return (
    <>
      <StaffFilterBar
        initialValues={{
          status: staffStatus,
          searchTerm,
        }}
        onSearch={handleSubmitSearch}
      />
      <StaffTable
        data={data?.data || []}
        isLoading={isLoading}
        searchTerm={searchTerm}
      />
      <TablePagination
        meta={{
          page: currentPage,
          pageSize,
          itemCount: data?.meta.itemCount || 0,
        }}
        label="staffs"
        onChange={handleChangePagination}
      />
    </>
  );
};
export default StaffListPage;
