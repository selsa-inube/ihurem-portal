import { IPendingVacationDays, IPendingVacationDaysApi } from "./types";

export const isPendingVacationApi = (
  obj: unknown,
): obj is IPendingVacationDaysApi => {
  if (typeof obj !== "object" || obj === null) return false;
  const record = obj as Record<string, unknown>;
  return (
    typeof record.daysRequested === "number" &&
    typeof record.employeeId === "string" &&
    typeof record.employeeName === "string" &&
    typeof record.employeeSurname === "string" &&
    typeof record.humanResourceRequestId === "string" &&
    typeof record.humanResourceRequestNumber === "string" &&
    typeof record.humanResourceRequestType === "string" &&
    typeof record.identificationDocumentNumber === "string" &&
    typeof record.identificationType === "string" &&
    typeof record.leadEmployeeId === "string" &&
    typeof record.leadEmployeeIdentificationDocumentNumber === "string" &&
    typeof record.leadEmployeeIdentificationType === "string" &&
    typeof record.leadEmployeeName === "string" &&
    typeof record.leadEmployeeSurname === "string" &&
    typeof record.periodFrom === "string" &&
    typeof record.periodTo === "string"
  );
};

export const mapPendingVacationApiToEntity = (
  api: IPendingVacationDaysApi,
): IPendingVacationDays => {
  return {
    daysRequested: api.daysRequested,
    employeeId: api.employeeId,
    employeeName: api.employeeName,
    employeeSurname: api.employeeSurname,
    humanResourceRequestId: api.humanResourceRequestId,
    humanResourceRequestNumber: api.humanResourceRequestNumber,
    humanResourceRequestType: api.humanResourceRequestType,
    identificationDocumentNumber: api.identificationDocumentNumber,
    identificationType: api.identificationType,
    leadEmployeeId: api.leadEmployeeId,
    leadEmployeeIdentificationDocumentNumber:
      api.leadEmployeeIdentificationDocumentNumber,
    leadEmployeeIdentificationType: api.leadEmployeeIdentificationType,
    leadEmployeeName: api.leadEmployeeName,
    leadEmployeeSurname: api.leadEmployeeSurname,
    periodFrom: api.periodFrom,
    periodTo: api.periodTo,
  };
};
