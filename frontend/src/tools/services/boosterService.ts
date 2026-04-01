import axiosInstance from "@lib/axios";

import type { Booster } from "../models";

export const fetchBoosters = async (): Promise<Booster[]> => {
  const { data } = await axiosInstance.get<Booster[]>("/boosters");
  return data;
};
