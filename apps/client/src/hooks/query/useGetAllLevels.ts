import { useQuery } from "@tanstack/react-query";
import api from "@/api/routes";
import { getImageUrl } from "@/api/utils";

export const useGetAllLevels = () => {
  return useQuery({
    queryKey: ["all-levels"],
    queryFn: api.getAllLevels,
    select: (data) => {
      return data.map((level) => ({
        ...level,
        imageUrl: getImageUrl(level.imageUrl),
      }));
    },
  });
};
