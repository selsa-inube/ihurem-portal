import { useIAuth } from "@inube/iauth-react";

import { environment } from "@config/environment";

export const useSignOut = () => {
  const { logout } = useIAuth();

  const signOut = (redirect?: string) => {
    if (!redirect) {
      logout();
    } else {
      logout({
        logoutParams: { returnTo: environment.REDIRECT_URI + redirect },
      });
    }
    return null;
  };

  return { signOut };
};
