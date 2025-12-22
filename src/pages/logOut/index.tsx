import { useIAuth } from "@inube/iauth-react";
import { useEffect } from "react";

export function LogOut() {
  const { logout } = useIAuth();
  useEffect(() => {
    logout();
  }, [logout]);
  return null;
}
