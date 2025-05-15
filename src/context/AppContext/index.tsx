import { createContext, useState, useEffect, ReactNode } from "react";
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

import { IAppContextType, IPreferences } from "./types";

const AppContext = createContext<IAppContextType | undefined>(undefined);

const AppProvider: React.FC<{
  children: ReactNode;
  dataPortal: IEmployeePortalByBusinessManager;
  businessManagersData: IBusinessManagers;
  businessUnitData: IBusinessUnitsPortalEmployee;
  employee: IEmployee;
  employeeOptions?: IEmployeeOptions[] | null;
}> = ({
  children,
  dataPortal,
  businessManagersData,
  businessUnitData,
  employee,
  employeeOptions,
}) => {
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
    useState<IEmployeePortalByBusinessManager | null>(dataPortal);

  const [businessManagers, setBusinessManagers] =
    useState<IBusinessManagers | null>(businessManagersData);

  const [businessUnit, setBusinessUnit] =
    useState<IBusinessUnitsPortalEmployee | null>(businessUnitData);

  const [employees, setEmployees] = useState<IEmployee>(employee);

  const updatePreferences = (newPreferences: Partial<IPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
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
    const storedEmployee = localStorage.getItem("selectedEmployee");
    return storedEmployee ? JSON.parse(storedEmployee) : null;
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
        handleClientChange: () => {
          console.log("handleClientChange");
        },
        provisionedPortal,
        setProvisionedPortal,
        businessManagers,
        setBusinessManagers,
        businessUnit,
        setBusinessUnit,
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
};

export { AppProvider, AppContext };
