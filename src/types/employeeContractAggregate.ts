import {
  ContractRemunerationAssignment,
  TraceabilityEmploymentContract,
} from "@ptypes/employeePortalConsultation.types";

export interface EmployeeContractAggregate {
  contractId: string;
  businessName: string;
  branchOfficeName: string;
  contractDurationInDays: number;
  contractIdRenewed: string;
  contractNumber: string;
  contractRemunerationAssignments: ContractRemunerationAssignment[];
  contractStatus: string;
  contractType: string;
  costCenterName: string;
  deadline: string;
  employeeId: string;
  formalizedStartDate: string;
  jobModality: string;
  joiningLetter: string;
  occupationTime: string;
  professionalRiskLevelName: string;
  proyectNumber: string;
  regulatoryFrameworkName: string;
  remunerationProfileName: string;
  startDate: string;
  traceabilityEmploymentContracts: TraceabilityEmploymentContract[];
  workSchedule: string;
  workingGroupId: string;
}
