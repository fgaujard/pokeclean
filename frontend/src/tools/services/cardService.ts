import axiosInstance from "@lib/axios";

import type { BinderCard } from "@models";

export const fetchBinderCards = async (
  userId: string,
): Promise<BinderCard[]> => {
  const { data } = await axiosInstance.get<BinderCard[]>(
    `/cards/binder?userId=${userId}`,
  );
  return data;
};
