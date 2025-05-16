import { HolidaysActionTypes } from "./holidays.types";

interface IEmployee {
  employeeId: string;
  names: string;
  surnames: string;
  biologicalSex: string;
  birthDay: string;
  identificationDocumentNumber: string;
  identificationType: string;
  employeeCode: string;
  residenceAddress: string;
  postalCode: string;
  email: string;
  telephone: string;
  countryTaxResidence: string;
  countryOfIdentityDocument: string;
  residenceCity: string;
  employeeStatus: string;
  ubication: string;
  userAccountId: string;
  employmentContract: IEmploymentContract[];
  employeeReference: IEmployeeReference[];
}

interface IEmploymentContract {
  contractId: string;
  contractNumber: string;
  employeeId: string;
  contractStatus: string;
  contractType: HolidaysActionTypes;
  startDate: string;
  formalizedStartDate: string;
  joiningDetter: string;
  contractDurationInDays?: string;
  deadline?: string;
  positionName: string;
  jobModality: string;
  workSchedule: string;
  professionalRiskDevelName: string;
  businessName: string;
  costCenterName: string;
  proyectNumber?: string;
  branchOfficeName: string;
  regulatoryFrameworkName?: string;
  remunerationProfileName: string;
}

interface IEmployeeReference {
  referenceId: string;
  employeeId: string;
  referenceName: string;
  referencePhoneNumber: string;
  referenceAddress: string;
  referenceType: string;
}

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

interface BusinessManagersByBusinessesUnit {
  businessManagerId: string;
  businessUnit: string;
}

interface PublicCodeTablesByBusinessesUnit {
  algorithmToPublicCode: string;
  businessTableId: string;
  businessUnit: string;
  lengthToPublicCode: number;
  prefixToPublicCode: string;
  publicCodeGeneration: string;
}

interface UseCasesByBusinessesUnit {
  businessUnit: string;
  effectiveDate: string;
  useCaseId: string;
}
interface IEmployeeOptions {
  abbreviatedName: string;
  descriptionUse: string;
  optionCode: string;
  optionEmployeeId: string;
}

export type {
  IEmployee,
  IEmploymentContract,
  IEmployeeReference,
  IOptionsByEmployeePortalBusinessManager,
  IEmployeePortalByBusinessManager,
  IBusinessManagers,
  IBusinessUnitsPortalEmployee,
  BusinessManagersByBusinessesUnit,
  PublicCodeTablesByBusinessesUnit,
  UseCasesByBusinessesUnit,
  IEmployeeOptions,
};
