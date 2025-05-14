import {
  IEmployee,
  IEmploymentContract,
  IEmployeeReference,
} from "@ptypes/employeePortalBusiness.types";
import { HolidaysActionTypes } from "@ptypes/holidays.types";

interface EmployeeApiResponse {
  employeeId: string | number;
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
  userAccountId: string | number;
  employmentContract?: EmploymentContractApiResponse[];
  employeeReference?: EmployeeReferenceApiResponse[];
}

interface EmploymentContractApiResponse {
  contractId: string | number;
  contractNumber: string | number;
  employeeId: string | number;
  contractStatus: string;
  contractType: string;
  startDate: string;
  formalizedStartDate: string;
  joiningDetter: string;
  contractDurationInDays?: string | number;
  deadline?: string;
  positionName: string;
  jobModality: string;
  workSchedule: string;
  professionalRiskDevelName: string;
  businessName: string;
  costCenterName: string;
  proyectNumber?: string | number;
  branchOfficeName: string;
  regulatoryFrameworkName?: string;
  remunerationProfileName: string;
}

interface EmployeeReferenceApiResponse {
  referenceId: string | number;
  employeeId: string | number;
  referenceName: string;
  referencePhoneNumber: string;
  referenceAddress: string;
  referenceType: string;
}

const mapEmployeeApiToEntity = (employee: EmployeeApiResponse): IEmployee => {
  return {
    employeeId: String(employee.employeeId),
    names: String(employee.names),
    surnames: String(employee.surnames),
    biologicalSex: String(employee.biologicalSex),
    birthDay: String(employee.birthDay),
    identificationDocumentNumber: String(employee.identificationDocumentNumber),
    identificationType: String(employee.identificationType),
    employeeCode: String(employee.employeeCode),
    residenceAddress: String(employee.residenceAddress),
    postalCode: String(employee.postalCode),
    email: String(employee.email),
    telephone: String(employee.telephone),
    countryTaxResidence: String(employee.countryTaxResidence),
    countryOfIdentityDocument: String(employee.countryOfIdentityDocument),
    residenceCity: String(employee.residenceCity),
    employeeStatus: String(employee.employeeStatus),
    ubication: String(employee.ubication),
    userAccountId: String(employee.userAccountId),
    employmentContract: employee.employmentContract
      ? mapEmploymentContracts(employee.employmentContract)
      : [],
    employeeReference: employee.employeeReference
      ? mapEmployeeReferences(employee.employeeReference)
      : [],
  };
};

const mapEmploymentContracts = (
  contracts: EmploymentContractApiResponse[],
): IEmploymentContract[] => {
  return contracts.map((contract) => ({
    contractId: String(contract.contractId),
    contractNumber: String(contract.contractNumber),
    employeeId: String(contract.employeeId),
    contractStatus: String(contract.contractStatus),
    contractType: contract.contractType as HolidaysActionTypes,
    startDate: String(contract.startDate),
    formalizedStartDate: String(contract.formalizedStartDate),
    joiningDetter: String(contract.joiningDetter),
    contractDurationInDays: contract.contractDurationInDays
      ? String(contract.contractDurationInDays)
      : "",
    deadline: contract.deadline ? String(contract.deadline) : "",
    positionName: String(contract.positionName),
    jobModality: String(contract.jobModality),
    workSchedule: String(contract.workSchedule),
    professionalRiskDevelName: String(contract.professionalRiskDevelName),
    businessName: String(contract.businessName),
    costCenterName: String(contract.costCenterName),
    proyectNumber: contract.proyectNumber ? String(contract.proyectNumber) : "",
    branchOfficeName: String(contract.branchOfficeName),
    regulatoryFrameworkName: contract.regulatoryFrameworkName
      ? String(contract.regulatoryFrameworkName)
      : "",
    remunerationProfileName: String(contract.remunerationProfileName),
  }));
};

const mapEmployeeReferences = (
  references: EmployeeReferenceApiResponse[],
): IEmployeeReference[] => {
  return references.map((reference) => ({
    referenceId: String(reference.referenceId),
    employeeId: String(reference.employeeId),
    referenceName: String(reference.referenceName),
    referencePhoneNumber: String(reference.referencePhoneNumber),
    referenceAddress: String(reference.referenceAddress),
    referenceType: String(reference.referenceType),
  }));
};

export { mapEmployeeApiToEntity };
