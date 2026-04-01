import axiosInstance from "@lib/axios";

import { createSearchParamsUrl } from "../utils/pageUtils";

import type { Page } from "../dto/page";
import type { Task } from "../models";
import type { SearchParams } from "@types";

export const fetchTasks = async (params: SearchParams): Promise<Page<Task>> => {
  const { data } = await axiosInstance.get<Page<Task>>(
    `/tasks/search?${createSearchParamsUrl(params)}`
  );
  return data;
};
