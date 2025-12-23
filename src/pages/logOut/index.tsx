import { useEffect } from "react";

import { useSignOut } from "@hooks/useSignOut";

export function LogOut() {
  const { signOut } = useSignOut();

  useEffect(() => {
    signOut("/");
  }, [signOut]);

  return null;
}
