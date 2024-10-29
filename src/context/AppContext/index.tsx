import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import selsaLogo from "@assets/images/selsa.png";
import { useAuth0 } from "@auth0/auth0-react";

interface Preferences {
  boardOrientation: "vertical" | "horizontal";
  showPinnedOnly: boolean;
}

interface AppContextType {
  user: { username: string; id: string; company: string } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      id: string;
      company: string;
    } | null>
  >;
  preferences: Preferences;
  updatePreferences: (newPreferences: Partial<Preferences>) => void;
  logoUrl: string;
  setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: auth0User } = useAuth0();
  const [user, setUser] = useState<{
    username: string;
    id: string;
    company: string;
  } | null>(
    auth0User
      ? {
          username: auth0User.name ?? "",
          id: "abc123",
          company: "Company Name",
        }
      : null,
  );

  const initialLogo = localStorage.getItem("logoUrl") ?? selsaLogo;
  const [logoUrl, setLogoUrl] = useState<string>(initialLogo);

  const [preferences, setPreferences] = useState<Preferences>({
    boardOrientation:
      (localStorage.getItem("boardOrientation") as "vertical" | "horizontal") ??
      "vertical",
    showPinnedOnly:
      JSON.parse(localStorage.getItem("showPinnedOnly") ?? "false") === true,
  });

  const updatePreferences = (newPreferences: Partial<Preferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("logoUrl", logoUrl);
      localStorage.setItem("boardOrientation", preferences.boardOrientation);
      localStorage.setItem(
        "showPinnedOnly",
        JSON.stringify(preferences.showPinnedOnly),
      );
    }
  }, [logoUrl, preferences, user]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        preferences,
        updatePreferences,
        logoUrl,
        setLogoUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useAppContext };
