import {
  ContractRemunerationAssignment,
  TraceabilityEmploymentContract,
} from "@ptypes/employeePortalConsultation.types";
import { EmployeeContractAggregate } from "@ptypes/employeeContractAggregate";

const toStringSafe = (value: unknown): string =>
  typeof value === "string" || typeof value === "number" ? String(value) : "";

const toNumberSafe = (value: unknown): number =>
  typeof value === "number" ? value : 0;

const mapContractRemunerationAssignmentApiToEntity = (
  assignment: Record<string, unknown>,
): ContractRemunerationAssignment => ({
  assignmentId: toStringSafe(assignment.assignmentId),
  contractId: toStringSafe(assignment.contractId),
  currencyCodeForPayment: toStringSafe(assignment.currencyCodeForPayment),
  currencyCodeForValue: toStringSafe(assignment.currencyCodeForValue),
  currencyNameForPayment: toStringSafe(assignment.currencyNameForPayment),
  currencyNameForValue: toStringSafe(assignment.currencyNameForValue),
  descriptionForTheEmployee: toStringSafe(assignment.descriptionForTheEmployee),
  descriptionForTheStaff: toStringSafe(assignment.descriptionForTheStaff),
  individualValuePerEmployee: toStringSafe(
    assignment.individualValuePerEmployee,
  ),
  timeUnitOfValue: toNumberSafe(assignment.timeUnitOfValue),
  wageComponentCode: toStringSafe(assignment.wageComponentCode),
});

const mapTraceabilityEmploymentContractApiToEntity = (
  trace: Record<string, unknown>,
): TraceabilityEmploymentContract => ({
  addendumDate: toStringSafe(trace.addendumDate),
  contractId: toStringSafe(trace.contractId),
  modifiedContractProperty: toStringSafe(trace.modifiedContractProperty),
  previousValue: toStringSafe(trace.previousValue),
  traceContractId: toStringSafe(trace.traceContractId),
});

const mapEmployeeContractApiToEntity = (
  contract: Record<string, unknown>,
): EmployeeContractAggregate => ({
  branchOfficeName: toStringSafe(contract.branchOfficeName),
  businessName: toStringSafe(contract.businessName),
  contractDurationInDays: toNumberSafe(contract.contractDurationInDays),
  contractId: toStringSafe(contract.contractId),
  contractIdRenewed: toStringSafe(contract.contractIdRenewed),
  contractNumber: toStringSafe(contract.contractNumber),
  contractRemunerationAssignments:
    (
      contract.contractRemunerationAssignments as Record<string, unknown>[]
    )?.map(mapContractRemunerationAssignmentApiToEntity) || [],
  contractStatus: toStringSafe(contract.contractStatus),
  contractType: toStringSafe(contract.contractType),
  costCenterName: toStringSafe(contract.costCenterName),
  deadline: toStringSafe(contract.deadline),
  employeeId: toStringSafe(contract.employeeId),
  formalizedStartDate: toStringSafe(contract.formalizedStartDate),
  jobModality: toStringSafe(contract.jobModality),
  joiningLetter: toStringSafe(contract.joiningLetter),
  occupationTime: toStringSafe(contract.occupationTime),
  professionalRiskLevelName: toStringSafe(contract.professionalRiskLevelName),
  proyectNumber: toStringSafe(contract.proyectNumber),
  regulatoryFrameworkName: toStringSafe(contract.regulatoryFrameworkName),
  remunerationProfileName: toStringSafe(contract.remunerationProfileName),
  startDate: toStringSafe(contract.startDate),
  traceabilityEmploymentContracts:
    (
      contract.traceabilityEmploymentContracts as Record<string, unknown>[]
    )?.map(mapTraceabilityEmploymentContractApiToEntity) || [],
  workSchedule: toStringSafe(contract.workSchedule),
  workingGroupId: toStringSafe(contract.workingGroupId),
});

export { mapEmployeeContractApiToEntity };
