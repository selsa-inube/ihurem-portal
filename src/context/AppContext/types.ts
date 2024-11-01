export interface IPreferences {
  boardOrientation: "vertical" | "horizontal";
  showPinnedOnly: boolean;
}

export interface IAppContextType {
  user: { username: string; id: string; company: string } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      id: string;
      company: string;
    } | null>
  >;
  preferences: IPreferences;
  updatePreferences: (newPreferences: Partial<IPreferences>) => void;
  logoUrl: string;
  setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
}
