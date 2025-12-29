import { useQuery } from "@tanstack/react-query";
import api from "@/api/routes";

export const useGetLevel = (levelId: string) => {
  return useQuery({
    queryKey: ["level", levelId],
    queryFn: async () => await api.getLevelById(levelId),
  });
};
