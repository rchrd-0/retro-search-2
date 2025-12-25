import type { ApiResponse } from "@retro-search-2/shared";
import ky from "ky";

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  retry: 0,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        const res = await response.json<ApiResponse<unknown>>();

        if (!res.success) {
          throw new Error(res.message);
        }

        if (res.data !== undefined) {
          return new Response(JSON.stringify(res.data), {
            status: response.status,
            headers: response.headers,
          });
        }

        const { ...body } = res;

        return new Response(JSON.stringify(body), {
          status: response.status,
          headers: response.headers,
        });
      },
    ],
  },
});
