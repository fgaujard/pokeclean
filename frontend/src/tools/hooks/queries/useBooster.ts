import { fetchBoosters } from "@services";
import { useQuery } from "@tanstack/react-query";

export const useBoosters = () => {
  return useQuery({
    queryKey: ["boosters"],
    queryFn: fetchBoosters,
  });
};
