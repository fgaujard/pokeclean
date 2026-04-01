export interface SearchParams {
  page: number;
  limit: number;
  search?: string;
  params: Array<{ key: string; value: unknown | unknown[] }>;
}
