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
  employmentContracts: IEmploymentContract[];
  employeeReference: IEmployeeReference[];
}

interface IEmploymentContract {
  contractId: string;
  contractNumber: string;
  employeeId: string;
  contractStatus: EContractStatus;
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
  vacationsHistory: IVacationHistory[];
  traceabilityEmploymentContracts: ITraceabilityEmploymentContract[];
  contractRemunerationAssignments: IContractRemunerationAssignment[];
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
  externalAuthenticationProvider: string;
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
  clientId: string;
  clientSecret: string;
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
  iconReference: string;
  optionCode: string;
  optionEmployeeId: string;
  parentOptionId: string;
}

interface IVacationHistory {
  businessDaysOfVacation: number;
  contractId: string;
  earlyReturnDate: string;
  employeeId: string;
  joiningLetter: string;
  nonWorkingDaysOfVacation: number;
  startDateVacationEnjoyment: string;
  vacationDaysPendingEarlyReturn: number;
  vacationId: string;
  vacationPaymentDate: string;
  vacationStatus: string;
  vacationType: string;
}

interface ITraceabilityEmploymentContract {
  addendumDate: string;
  contractId: string;
  modifiedContractProperty: string;
  previousValue: string;
  traceContractId: string;
}

interface IContractRemunerationAssignment {
  assignmentId: string;
  contractId: string;
  currencyCodeForPayment: string;
  currencyCodeForValue: string;
  currencyNameForPayment: string;
  currencyNameForValue: string;
  descriptionForTheEmployee: string;
  descriptionForTheStaff: string;
  individualValuePerEmployee: string;
  timeUnitOfValue: number;
  wageComponentCode: string;
}

export enum EContractStatus {
  in_the_process_of_formalization = "in_the_process_of_formalization",
  formalized = "formalized",
  finalized = "finalized",
  in_the_process_of_ending = "in_the_process_of_ending",
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
  IVacationHistory,
  ITraceabilityEmploymentContract,
  IContractRemunerationAssignment,
};
