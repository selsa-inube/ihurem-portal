import {
  IBusinessManagers,
  IBusinessUnitsPortalEmployee,
  IEmployeePortalByBusinessManager,
  IEmployee,
} from "@src/types/employeePortalBusiness.types";

export interface IPreferences {
  boardOrientation: "vertical" | "horizontal";
  showPinnedOnly: boolean;
}

export interface IClient {
  id: string;
  name: string;
  sigla: string;
  logo: string;
}

export interface IProvisionedPortal {
  status: string;
  lastUpdated: string;
  resources: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
}

export interface IAppContextType {
  user: {
    username: string;
    id: string;
    company: string;
    urlImgPerfil: string;
    nickname: string;
  } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      username: string;
      id: string;
      company: string;
      urlImgPerfil: string;
      nickname: string;
    } | null>
  >;
  preferences: IPreferences;
  updatePreferences: (newPreferences: Partial<IPreferences>) => void;
  logoUrl: string;
  setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
  handleClientChange: (client: IClient) => void;
  businessUnitSigla?: string;
  provisionedPortal: IEmployeePortalByBusinessManager | null;
  setProvisionedPortal: React.Dispatch<
    React.SetStateAction<IEmployeePortalByBusinessManager | null>
  >;
  businessManagers: IBusinessManagers | null;
  setBusinessManagers: React.Dispatch<
    React.SetStateAction<IBusinessManagers | null>
  >;
  businessUnit: IBusinessUnitsPortalEmployee | null;
  setBusinessUnit: React.Dispatch<
    React.SetStateAction<IBusinessUnitsPortalEmployee | null>
  >;
  employees: IEmployee[];
  setEmployees: React.Dispatch<React.SetStateAction<IEmployee>>;
}
