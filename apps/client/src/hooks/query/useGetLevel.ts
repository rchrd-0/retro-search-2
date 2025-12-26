import { useQuery } from "@tanstack/react-query";
import api from "@/api/routes";
import { getImageUrl } from "@/api/utils";

export const useGetLevel = (levelId: string) => {
  return useQuery({
    queryKey: ["level", levelId],
    queryFn: async () => await api.getLevelById(levelId),
    select: (data) => {
      const level = {
        ...data,
        imageUrl: getImageUrl(data.imageUrl),

        characters: data.characters.map((character) => ({
          ...character,
          imageUrl: getImageUrl(character.imageUrl),
        })),
      };

      return {
        ...data,
        level,
      };
    },
  });
};
