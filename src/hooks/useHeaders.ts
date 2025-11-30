import { useIAuth } from "@inube/iauth-react";

export const useHeaders = () => {
  const { getAccessTokenSilently } = useIAuth();

  const getHeaders = async (withAuth = true) => {
    const headers: Record<string, string> = {
      "Content-type": "application/json; charset=UTF-8",
      "X-Business-unit": "test",
    };

    if (withAuth) {
      const accessToken = await getAccessTokenSilently();
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return headers;
  };

  return { getHeaders };
};
