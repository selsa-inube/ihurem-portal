import { useCallback } from "react";
import { useIAuth } from "@inube/iauth-react";

export const useHeaders = () => {
  const { getAccessTokenSilently } = useIAuth();

  const getHeaders = useCallback(
    async (withAuth = true) => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json; charset=UTF-8",
        "X-Business-unit": "test",
      };

      if (withAuth) {
        const accessToken = await getAccessTokenSilently();
        headers.Authorization = `Bearer ${accessToken}`;
      }

      return headers;
    },
    [getAccessTokenSilently],
  );

  return { getHeaders };
};
