export interface HumanResourceRequestTraceability {
  actionExecuted: string;
  description: string;
  executionDate: string;
  humanResourceRequestId: string;
  traceabilityId: string;
  userWhoExecutedAction: string;
}

export interface TaskToManageHumanResourceRequest {
  description: string;
  humanResourceRequestId: string;
  taskCode: string;
  taskManagingId: string;
  taskName: string;
  taskStatus: ETaskStatus;
}

export interface HumanResourceRequest {
  employeeId: string;
  humanResourceRequestData: HumanResourceRequestData;
  humanResourceRequestDate: string;
  humanResourceRequestDescription: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestStatus: ERequestStatus;
  humanResourceRequestTraceabilities: HumanResourceRequestTraceability[];
  humanResourceRequestType: ERequestType;
  tasksToManageTheHumanResourcesRequests: TaskToManageHumanResourceRequest[];
  userCodeInCharge: string;
  userNameInCharge: string;
}

export interface IVacationGeneralInformationEntry {
  id: string;
  daysOff: string;
  startDate: string;
  contract: string;
  observations: string;
  typeOfRequest?: string;
}

export interface IVacationPaymentGeneralInformationEntry {
  id: string;
  daysToPay: string;
  contract: string;
  observations: string;
}

export interface ICertificationGeneralInformationEntry {
  id: string;
  certification: string;
  addressee: string;
  contract: string;
  contractDesc: string;
  observations: string;
}

export type HumanResourceRequestData =
  | IVacationGeneralInformationEntry
  | ICertificationGeneralInformationEntry
  | IVacationPaymentGeneralInformationEntry;

export enum ERequestType {
  Absence = "Ausencia",
  Certification = "Certificación",
  Disability = "Incapacidad",
  Leave = "Permiso",
  LeavingTheJob = "Retiro",
  Onboarding = "Ingreso",
  PaidVacations = "Pago de vacaciones",
  PositionTransfer = "Traslado de puesto",
  PQR = "PQR",
  SalaryIncrease = "Aumento salarial",
  UnpaidLeave = "Licencia no remunerada",
  VacationsEnjoyed = "Disfrute de vacaciones",
}

export enum ETaskStatus {
  Assigned = "Asignada",
  Executed = "Ejecutada",
}

export enum ERequestStatus {
  Canceled = "Cancelado",
  Closed = "Cerrado",
  Finished = "Finalizado",
  supervisor_approval = "En progreso",
  Rejected = "Rechazado",
}

export type HumanResourceRequests = HumanResourceRequest[];
