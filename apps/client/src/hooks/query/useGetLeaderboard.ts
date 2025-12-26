import { useQuery } from "@tanstack/react-query";
import routes from "@/api/routes";

export const useGetLeaderboard = (levelId: string) => {
  return useQuery({
    queryKey: ["leaderboard", levelId],
    queryFn: () => routes.getLeaderboard(levelId),
  });
};
