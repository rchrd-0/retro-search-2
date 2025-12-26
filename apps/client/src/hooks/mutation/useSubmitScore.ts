import type { LeaderboardEntry } from "@retro-search-2/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import routes from "@/api/routes";

export const useSubmitScore = (levelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LeaderboardEntry) => routes.postSubmitScore(levelId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard", levelId] });
    },
  });
};
