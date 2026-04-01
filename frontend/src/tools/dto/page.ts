export interface Page<T> {
  items: T[];
  meta: {
    totalItems: number;
    currentPage: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
