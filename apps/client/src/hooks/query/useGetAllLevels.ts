import { useQuery } from "@tanstack/react-query";
import api from "@/api/routes";

export const useGetAllLevels = () => {
  return useQuery({
    staleTime: 5 * 60 * 1000,
    queryKey: ["all-levels"],
    queryFn: api.getAllLevels,
  });
};
