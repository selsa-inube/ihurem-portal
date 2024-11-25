import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import selsaLogo from "@assets/images/selsa.png";
import { useAuth0 } from "@auth0/auth0-react";
import { IAppContextType, IPreferences } from "./types";
import {
  IBusinessManagers,
  IBusinessUnitsPortalEmployee,
  IEmployeePortalByBusinessManager,
} from "@src/types/employeePortalBusiness.types";

const AppContext = createContext<IAppContextType | undefined>(undefined);

const AppProvider: React.FC<{
  children: ReactNode;
  dataPortal: IEmployeePortalByBusinessManager;
  businessManagersData: IBusinessManagers;
  businessUnitData: IBusinessUnitsPortalEmployee;
}> = ({ children, dataPortal, businessManagersData, businessUnitData }) => {
  const { user: auth0User } = useAuth0();
  const [user, setUser] = useState<{
    username: string;
    id: string;
    company: string;
    urlImgPerfil: string;
  } | null>(
    auth0User
      ? {
          username: auth0User.name ?? "",
          id: auth0User.nickname ?? "",
          company: businessUnitData.businessUnit ?? "Company Name",
          urlImgPerfil: auth0User.picture ?? "",
        }
      : null,
  );

  const initialLogo = localStorage.getItem("logoUrl") ?? selsaLogo;
  const [logoUrl, setLogoUrl] = useState<string>(initialLogo);
  const [preferences, setPreferences] = useState<IPreferences>({
    boardOrientation:
      (localStorage.getItem("boardOrientation") as "vertical" | "horizontal") ??
      "vertical",
    showPinnedOnly: false,
  });

  const [provisionedPortal, setProvisionedPortal] =
    useState<IEmployeePortalByBusinessManager | null>(dataPortal);

  const [businessManagers, setBusinessManagers] =
    useState<IBusinessManagers | null>(businessManagersData);

  const [businessUnit, setBusinessUnit] =
    useState<IBusinessUnitsPortalEmployee | null>(businessUnitData);

  const updatePreferences = (newPreferences: Partial<IPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("logoUrl", logoUrl);
      localStorage.setItem("boardOrientation", preferences.boardOrientation);
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
        handleClientChange: () => {
          console.log("handleClientChange");
        },
        provisionedPortal,
        setProvisionedPortal,
        businessManagers,
        setBusinessManagers,
        businessUnit,
        setBusinessUnit,
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
