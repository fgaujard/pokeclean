export interface Page<T> {
  items: T[];
  meta: {
    totalItems: number;
    limit: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
