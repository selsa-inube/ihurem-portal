interface IOptionsByEmployeePortalBusinessManager {
  optionEmployeeId: string;
  employeePortalCatalogId: string;
  employeePortalId: string;
}

interface IEmployeePortalByBusinessManager {
  abbreviatedName: string;
  businessManagerId: string;
  businessUnit: string;
  descriptionUse: string;
  portalCode: string;
  employeePortalCatalogId: string;
  employeePortalId: string;
  optionsByEmployeePortalBusinessManager?: IOptionsByEmployeePortalBusinessManager[];
}

interface IBusinessManagers {
  id: string;
  publicCode: string;
  language: string;
  abbreviatedName: string;
  description: string;
  urlBrand: string;
  urlLogo: string;
  customerId: string;
}

interface IBusinessUnitsPortalEmployee {
  abbreviatedName: string;
  businessManagersByBusinessesUnit?: BusinessManagersByBusinessesUnit[];
  businessUnit: string;
  descriptionUse: string;
  firstMonthOfFiscalYear: string;
  languageId: string;
  publicCode: string;
  publicCodeTablesByBusinessesUnit?: PublicCodeTablesByBusinessesUnit[];
  urlLogo: string;
  useCasesByBusinessesUnit: UseCasesByBusinessesUnit[];
}

export interface BusinessManagersByBusinessesUnit {
  businessManagerId: string;
  businessUnit: string;
}

export interface PublicCodeTablesByBusinessesUnit {
  algorithmToPublicCode: string;
  businessTableId: string;
  businessUnit: string;
  lengthToPublicCode: number;
  prefixToPublicCode: string;
  publicCodeGeneration: string;
}

export interface UseCasesByBusinessesUnit {
  businessUnit: string;
  effectiveDate: string;
  useCaseId: string;
}

export type {
  IEmployeePortalByBusinessManager,
  IBusinessManagers,
  IBusinessUnitsPortalEmployee,
};
