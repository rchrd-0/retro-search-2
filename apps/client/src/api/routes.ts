import {
  type LeaderboardEntry,
  LeaderboardSchema,
  type Level,
  type Score,
  type StartGameResponse,
  type VerifyTarget,
  VerifyTargetSchema,
} from "@retro-search-2/shared";
import { parse } from "valibot";
import { apiClient } from "@/api/client";
import { handleValidationError } from "@/api/utils";

const routes = {
  getAllLevels: async () => {
    return await apiClient.get("level").json<Level[]>();
  },
  getLevelById: async (levelId: string) => {
    const response = await apiClient.get(`level/${levelId}`).json<StartGameResponse>();

    sessionStorage.setItem("rs:session_id", response.sessionId);

    return response;
  },
  postVerifyTarget: async (levelId: string, payload: VerifyTarget) => {
    try {
      const validated = parse(VerifyTargetSchema, payload);

      return await apiClient
        .post(`level/${levelId}/verify`, { json: validated })
        .json<{ success: boolean; message: string }>();
    } catch (error) {
      handleValidationError(error);
    }
  },
  getLeaderboard: async (levelId: string) => {
    return await apiClient.get(`level/${levelId}/leaderboard`).json<Score[]>();
  },
  postSubmitScore: async (levelId: string, payload: LeaderboardEntry) => {
    try {
      const validated = parse(LeaderboardSchema, payload);

      return await apiClient
        .post(`level/${levelId}/leaderboard`, { json: validated })
        .json<Score>();
    } catch (error) {
      handleValidationError(error);
    }
  },
};

export default routes;
