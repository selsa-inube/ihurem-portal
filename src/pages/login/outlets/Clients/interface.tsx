import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function ClientsUI() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        authorizationParams: {
          connection: "google-oauth2",
        },
        appState: {
          returnTo: "/*",
        },
      }).catch((error) => {
        console.error("Error al intentar iniciar sesión:", error);
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  return null;
}

export { ClientsUI };
