import { LogoutOptions, RedirectLoginOptions } from "@auth0/auth0-react";

import { IUser } from "../AppContext/types";

interface IAuthContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithRedirect: (options?: RedirectLoginOptions) => void;
  logout: (options?: LogoutOptions) => void;
  getAccessTokenSilently: () => Promise<string>;
}

export type { IAuthContextType };
