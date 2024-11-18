interface IOptionsByEmployeePortalBusinessManager {
  optionEmployeeId: string;
  employeePortalCatalogId: string;
  employeePortalId: string;
}

interface IEmployeePortalByBusinessManager {
  abbreviatedName: string;
  businessManagerId: string;
  descriptionUse: string;
  publicCode: string;
  employeePortalCatalogId: string;
  employeePortalId: string;
  url: string;
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
  publicCode: string;
  languageId: string;
  abbreviatedName: string;
  descriptionUse: string;
  firstMonthOfFiscalYear: string;
  urlLogo: string;
}

export type {
  IEmployeePortalByBusinessManager,
  IBusinessManagers,
  IBusinessUnitsPortalEmployee,
};
