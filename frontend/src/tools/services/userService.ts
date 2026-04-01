import axiosInstance from "@lib/axios";

import type { User } from "@models";

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axiosInstance.get<User[]>("/users");
  return data;
};
