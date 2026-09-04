interface PaginationMeta {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
  take: number;
}

interface PaginatedResponse<T> {
  data: T[];
  itemCount: number;
  // meta: PaginationMeta;
}

interface PaginatedData<T> {
  data: T[];
  meta: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    itemCount: number;
    limit: number;
    page: number;
    pageCount: number;
  };
}
