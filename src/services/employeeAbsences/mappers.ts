import { EmployeeAbsence } from "@ptypes/employeeAbsence.types";

export const mapEmployeeAbsenceApiToEntity = (
  item: Partial<EmployeeAbsence>,
): EmployeeAbsence => ({
  absenceDays: Number(item.absenceDays ?? 0),
  absenceId: String(item.absenceId ?? ""),
  absenceReason: String(item.absenceReason ?? ""),
  absenceReasonDetails: String(item.absenceReasonDetails ?? ""),
  absenceStartDate: String(item.absenceStartDate ?? ""),
  absenceStartHour: Number(item.absenceStartHour ?? 0),
  contractId: String(item.contractId ?? ""),
  employeeId: String(item.employeeId ?? ""),
  hoursAbsent: Number(item.hoursAbsent ?? 0),
  subReason: String(item.subReason ?? ""),
});
