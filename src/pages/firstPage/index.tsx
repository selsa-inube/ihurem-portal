import { useAppContext } from "@context/AppContext/useAppContext";
import { LoginRoutes } from "@routes/login";

import { Home } from "../home";

export function FirstPage() {
  const { user, provisionedPortal } = useAppContext();

  return (provisionedPortal?.portalCode &&
    provisionedPortal.portalCode.length === 0) ||
    !user ? (
    <LoginRoutes />
  ) : (
    <Home />
  );
}
