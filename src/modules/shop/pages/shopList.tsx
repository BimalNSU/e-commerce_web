import { usePaginatedShops } from "../hooks/usePaginatedShops";
import { useSearchParams } from "react-router-dom";
import ShopTable from "./components/ShopTable";
import ShopFilterBar from "./components/ShopFilterBar";
import TablePagination from "../../../components/TablePagination/TablePagination";

const ShopList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);
  const searchTerm = searchParams.get("q");

  // const staffStatusStr = searchParams.get("status");
  // const staffStatus = staffStatusStr ? Number(staffStatusStr) : undefined;

  const { data, isLoading } = usePaginatedShops({
    page: currentPage,
    limit: pageSize,
    ...(searchTerm && { search: searchTerm }),
  });

  const updateUrlParams = (queryFilters: any) => {
    const queryParams = new URLSearchParams(searchParams);

    queryFilters.searchTerm
      ? queryParams.set("q", queryFilters.searchTerm)
      : queryParams.delete("q");

    queryParams.set("page", queryFilters.page);
    queryParams.set("pageSize", queryFilters.pageSize);
    setSearchParams(queryParams, { replace: true });
    // navigate(
    //   { pathname: location.pathname, search: queryParams.toString() },
    //   { replace: true },
    // );
  };

  const handleSubmitSearch = (values: { searchTerm?: string }) => {
    updateUrlParams({
      page: 1, //default
      pageSize: 10, //default
      // status: values.status,
      searchTerm: values.searchTerm,
    });
  };
  const handleChangePagination = (page: number, pageSize: number) => {
    updateUrlParams({
      page,
      pageSize,
      //   status: shopStatus,
      searchTerm,
    });
  };

  return (
    <>
      <ShopFilterBar
        initialValues={{ searchTerm }}
        onSearch={handleSubmitSearch}
      />
      <ShopTable
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
        label="shops"
        onChange={handleChangePagination}
      />
    </>
  );
};
export default ShopList;
