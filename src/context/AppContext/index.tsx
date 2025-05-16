import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  IBusinessManagers,
  IBusinessUnitsPortalEmployee,
  IEmployeePortalByBusinessManager,
  IEmployee,
  IEmployeeOptions,
} from "@ptypes/employeePortalBusiness.types";
import { Employee } from "@ptypes/employeePortalConsultation.types";
import selsaLogo from "@assets/images/selsa.png";

import { IAppContextType, IPreferences, IClient } from "./types";

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
  const { user: auth0User } = useAuth0();
  const [user, setUser] = useState<{
    username: string;
    id: string;
    company: string;
    urlImgPerfil: string;
    nickname: string;
  } | null>(
    auth0User
      ? {
          username: auth0User.name ?? "",
          id: auth0User.nickname ?? "",
          company: businessUnitData.businessUnit ?? "Company Name",
          urlImgPerfil: auth0User.picture ?? "",
          nickname: auth0User.nickname ?? "",
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
    if (user) {
      localStorage.setItem("logoUrl", logoUrl);
      localStorage.setItem("boardOrientation", preferences.boardOrientation);
    }
  }, [logoUrl, preferences, user]);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(() => {
    const stored = localStorage.getItem("selectedEmployee");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (selectedEmployee) {
      localStorage.setItem(
        "selectedEmployee",
        JSON.stringify(selectedEmployee),
      );
    } else {
      localStorage.removeItem("selectedEmployee");
    }
  }, [selectedEmployee]);

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
        selectedEmployee,
        setSelectedEmployee,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, AppContext, useAppContext };
