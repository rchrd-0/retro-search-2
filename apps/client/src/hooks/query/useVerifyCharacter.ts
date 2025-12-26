import type { VerifyTarget } from "@retro-search-2/shared";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/routes";

export const useVerifyCharacter = (levelId: string) => {
  return useMutation({
    mutationKey: ["verify-character", levelId],
    mutationFn: async (payload: VerifyTarget) => await api.postVerifyTarget(levelId, payload),
  });
};
