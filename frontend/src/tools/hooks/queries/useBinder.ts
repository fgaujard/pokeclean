import { useQuery } from "@tanstack/react-query";

import { fetchBinderCards } from "@services";

export const useBinderCards = (userId?: string) => {
  return useQuery({
    queryKey: ["binder-cards", userId],
    queryFn: () => fetchBinderCards(userId as string),
    enabled: !!userId,
  });
};
