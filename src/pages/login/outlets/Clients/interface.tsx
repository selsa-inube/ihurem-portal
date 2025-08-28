import { useEffect, useState } from "react";

import { useIAuth } from "@context/authContext";

function ClientsUI() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useIAuth();
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hasAccessCode = urlParams.get("ac");
    const authAttempted = localStorage.getItem("auth_attempted");

    if (
      !isLoading &&
      !isAuthenticated &&
      !hasAccessCode &&
      !authAttempted &&
      !hasAttemptedLogin
    ) {
      setHasAttemptedLogin(true);
      localStorage.setItem("auth_attempted", "true");
      loginWithRedirect({
        authorizationParams: {
          connection: "google-oauth2",
        },
        appState: {
          returnTo: "/",
        },
      });
    }

    if (isAuthenticated) {
      localStorage.removeItem("auth_attempted");
      setHasAttemptedLogin(false);
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, hasAttemptedLogin]);

  return null;
}

export { ClientsUI };
