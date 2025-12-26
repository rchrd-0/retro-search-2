import {
  type Level,
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
    return await apiClient.get(`level/${levelId}`).json<StartGameResponse>();
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
};

export default routes;
