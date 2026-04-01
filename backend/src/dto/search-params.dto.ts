import { SortOrder } from "@types";

export interface SearchParams {
  resourceId?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  filters?: Record<string, { values: any[]; mustAllMatch?: boolean }>;
}
