import { useCallback } from "react";
import { useIAuth } from "@inube/iauth-react";
import { getPreAuthHeaders } from "@utils/preAuthHeaders";

export const useHeaders = () => {
  const { getAccessTokenSilently } = useIAuth();

  const getHeaders = useCallback(
    async (withAuth = true): Promise<Record<string, string>> => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json; charset=UTF-8",
        "X-Business-unit": "test",
        Authorization: "",
      };

      if (withAuth) {
        try {
          const accessToken = await getAccessTokenSilently();
          headers.Authorization = `Bearer ${accessToken}`;
        } catch {
          return getPreAuthHeaders();
        }
      }

      return headers;
    },
    [getAccessTokenSilently],
  );

  return { getHeaders };
};
