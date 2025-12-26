import type { ApiResponse } from "@retro-search-2/shared";
import ky from "ky";

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  retry: 0,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const sessionId = sessionStorage.getItem("rs:session_id");

        if (sessionId) {
          request.headers.set("X-SESSION-ID", sessionId);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          sessionStorage.removeItem("rs:session_id");
        }

        const parsedBody = await response.json<ApiResponse<unknown>>();

        if (!response.ok || !parsedBody.success) {
          throw new Error(parsedBody.message || "An unknown error occurred");
        }

        if (parsedBody.data !== undefined) {
          return new Response(JSON.stringify(parsedBody.data), {
            status: response.status,
            headers: response.headers,
          });
        }

        const { ...body } = parsedBody;

        return new Response(JSON.stringify(body), {
          status: response.status,
          headers: response.headers,
        });
      },
    ],
  },
});
