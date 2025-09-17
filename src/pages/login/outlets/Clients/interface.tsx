import { useEffect } from "react";
import { useIAuth } from "@inube/iauth-react";

function ClientsUI() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useIAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        authorizationParams: {
          connection: "google-oauth2",
        },
        appState: {
          returnTo: "/",
        },
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  return null;
}

export { ClientsUI };
