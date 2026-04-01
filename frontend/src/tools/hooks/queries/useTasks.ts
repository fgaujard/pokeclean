import { fetchTasks } from "@services";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { Grade, TaskType } from "@/tools/models/enums";

interface TaskSearchParams {
  userId?: string;
  search?: string;
  grade?: Grade;
  type?: TaskType;
}

export const useTasks = (params: TaskSearchParams) => {
  const { userId, search, grade, type } = params;

  const otherParams = [
    {
      key: "user",
      value: userId,
    },
    {
      key: "grade",
      value: grade,
    },
    {
      key: "type",
      value: type,
    },
  ];

  return useInfiniteQuery({
    queryKey: ["tasks", { search, grade, type }],
    queryFn: ({ pageParam = 1 }) =>
      fetchTasks({
        page: pageParam,
        limit: 10,
        search,
        params: otherParams,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextPage
        ? lastPage.meta.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
    enabled: true,
  });
};
