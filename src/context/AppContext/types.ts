import {
  IBusinessManagers,
  IBusinessUnitsPortalEmployee,
  IEmployeePortalByBusinessManager,
  IEmployee,
  IEmployeeOptions,
} from "@ptypes/employeePortalBusiness.types";

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

export interface IUser {
  username: string;
  id: string;
  company: string;
  urlImgPerfil: string;
  nickname: string;
}

export interface IAppContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  preferences: IPreferences;
  updatePreferences: (newPreferences: Partial<IPreferences>) => void;
  logoUrl: string;
  setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
  handleClientChange: (client: IClient) => void;
  businessUnitSigla?: string;
  provisionedPortal: IEmployeePortalByBusinessManager;
  setProvisionedPortal: React.Dispatch<
    React.SetStateAction<IEmployeePortalByBusinessManager>
  >;
  businessManagers: IBusinessManagers;
  setBusinessManagers: React.Dispatch<React.SetStateAction<IBusinessManagers>>;
  businessUnit: IBusinessUnitsPortalEmployee;
  setBusinessUnit: React.Dispatch<
    React.SetStateAction<IBusinessUnitsPortalEmployee>
  >;
  selectedClient: IClient | null;
  setSelectedClient: React.Dispatch<React.SetStateAction<IClient | null>>;
  employees: IEmployee;
  setEmployees: React.Dispatch<React.SetStateAction<IEmployee>>;

  employeeOptions: IEmployeeOptions[];
  setEmployeeOptions: React.Dispatch<React.SetStateAction<IEmployeeOptions[]>>;
}
