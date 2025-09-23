import { createContext, useState, useEffect, ReactNode } from "react";
import { useIAuth } from "@inube/iauth-react";

import {
  IBusinessManagers,
  IBusinessUnitsPortalEmployee,
  IEmployeePortalByBusinessManager,
  IEmployee,
  IEmployeeOptions,
} from "@ptypes/employeePortalBusiness.types";
import selsaLogo from "@assets/images/selsa.png";

import { IAppContextType, IPreferences, IClient, IUser } from "./types";

const AppContext = createContext<IAppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  dataPortal: IEmployeePortalByBusinessManager;
  businessManagersData: IBusinessManagers;
  businessUnitData: IBusinessUnitsPortalEmployee;
  employee: IEmployee;
  employeeOptions?: IEmployeeOptions[] | null;
}

function AppProvider(props: AppProviderProps) {
  const {
    children,
    dataPortal,
    businessManagersData,
    businessUnitData,
    employee,
    employeeOptions,
  } = props;

  const authData = useIAuth();
  const IAuthUser = authData.user;
  const isAuthLoading = authData.isLoading ?? false;

  const [user, setUser] = useState<IUser | null>(null);
  const [isUserInitialized, setIsUserInitialized] = useState(false);
  const [isAuthInitializing, setIsAuthInitializing] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (authData.isLoading === undefined) {
      timeoutId = setTimeout(() => {
        setIsAuthInitializing(false);
      }, 3000);
    }

    if (IAuthUser) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
      setIsAuthInitializing(false);

      setUser({
        username: IAuthUser.username ?? "",
        id: IAuthUser.id ?? "",
        company: businessUnitData.publicCode ?? "",
        urlImgPerfil: IAuthUser.urlImgPerfil ?? "",
        nickname: IAuthUser.nickname ?? "",
      });
      setIsUserInitialized(true);
    } else if (!isAuthLoading && !isAuthInitializing) {
      setUser(null);
      setIsUserInitialized(true);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [
    IAuthUser,
    businessUnitData.publicCode,
    isAuthLoading,
    isAuthInitializing,
    authData.isLoading,
  ]);

  useEffect(() => {
    if (authData.isLoading !== undefined) {
      setIsAuthInitializing(authData.isLoading);
      if (!authData.isLoading) {
        setIsUserInitialized(true);
      }
    }
  }, [authData.isLoading]);

  const initialLogo = localStorage.getItem("logoUrl") ?? selsaLogo;
  const [logoUrl, setLogoUrl] = useState<string>(initialLogo);
  const [preferences, setPreferences] = useState<IPreferences>({
    boardOrientation:
      (localStorage.getItem("boardOrientation") as "vertical" | "horizontal") ??
      "vertical",
    showPinnedOnly: false,
  });

  const [provisionedPortal, setProvisionedPortal] =
    useState<IEmployeePortalByBusinessManager>(dataPortal);

  const [businessManagers, setBusinessManagers] =
    useState<IBusinessManagers>(businessManagersData);

  const [businessUnit, setBusinessUnit] =
    useState<IBusinessUnitsPortalEmployee>(businessUnitData);
  const [employees, setEmployees] = useState<IEmployee>(employee);

  const updatePreferences = (newPreferences: Partial<IPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  };

  const [selectedClient, setSelectedClient] = useState<IClient | null>(() => {
    const storedClient = localStorage.getItem("selectedClient");
    if (storedClient) {
      try {
        return JSON.parse(storedClient);
      } catch (error) {
        console.error(
          "Error al parsear selectedClient desde localStorage",
          error,
        );
      }
    }
    return null;
  });

  useEffect(() => {
    if (selectedClient) {
      localStorage.setItem("selectedClient", JSON.stringify(selectedClient));
    } else {
      localStorage.removeItem("selectedClient");
    }
  }, [selectedClient]);

  const handleClientChange = (client: IClient) => {
    setSelectedClient(client);
  };

  const [employeeOptionsState, setEmployeeOptions] = useState<
    IEmployeeOptions[]
  >(employeeOptions ?? []);

  useEffect(() => {
    if (user && isUserInitialized) {
      localStorage.setItem("logoUrl", logoUrl);
      localStorage.setItem("boardOrientation", preferences.boardOrientation);
    }
  }, [logoUrl, preferences, user, isUserInitialized]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        preferences,
        updatePreferences,
        logoUrl,
        setLogoUrl,
        handleClientChange,
        provisionedPortal,
        setProvisionedPortal,
        businessManagers,
        setBusinessManagers,
        businessUnit,
        setBusinessUnit,
        selectedClient,
        setSelectedClient,
        employees,
        setEmployees,
        employeeOptions: employeeOptionsState,
        setEmployeeOptions,
        isUserInitialized,
        isAuthLoading: isAuthLoading || isAuthInitializing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
