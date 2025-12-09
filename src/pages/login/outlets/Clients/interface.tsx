import { useEffect } from "react";
import { useIAuth } from "@inube/iauth-react";

function ClientsUI() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useIAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  return null;
}

export { ClientsUI };
