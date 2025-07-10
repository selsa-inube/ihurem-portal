export enum ERequestType {
  Absence = "Ausencia",
  Certification = "Certificación",
  Disability = "Incapacidad",
  Leave = "Permiso",
  LeavingTheJob = "Retiro",
  Onboarding = "Vinculación",
  PaidVacations = "Vacaciones Pagadas",
  PositionTransfer = "Traslado de cargo",
  PQR = "PQR",
  SalaryIncrease = "Ascenso salarial",
  UnpaidLeave = "Licencia no remunerada",
  VacationsEnjoyed = "Vacaciones Disfrutadas",
}

export enum ETaskStatus {
  Assigned = "Asignada",
  Executed = "Ejecutada",
}

export enum HumanResourceRequestStatus {
  closed = "Cerrada",
  rejected = "Rechazada",
  canceled = "Cancelada",
  supervisor_approval = "Aprobación Jefe Inmediato",
  HR_compliance_verification = "Verificación en Gestión Humana",
  confirmation_of_vacation_taken = "Confirmación Disfrute de vacaciones",
  successfully_processed = "Tramitada con Éxito",
  certification_generation = "Generación de la certificación",
  onboarding_in_progress = "Vinculación en Progreso",
}

export enum ERequestStatus {
  Canceled = "Cancelado",
  Closed = "Cerrado",
  Finished = "Finalizado",
  supervisor_approval = "En progreso",
  Rejected = "Rechazado",
}

export interface IUnifiedHumanResourceRequestData {
  contractId: string;
  contractNumber: string;
  businessName: string;
  contractType: string;
  observationEmployee: string;
  daysToPay?: string;
  disbursementDate?: string;
  daysOff?: string;
  startDateEnyoment?: string;
  certificationType?: string;
  addressee?: string;
}

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
  humanResourceRequestData: IUnifiedHumanResourceRequestData;
  humanResourceRequestDate: string;
  humanResourceRequestDescription: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestStatus: HumanResourceRequestStatus;
  humanResourceRequestTraceabilities: HumanResourceRequestTraceability[];
  humanResourceRequestType: ERequestType;
  tasksToManageTheHumanResourcesRequests: TaskToManageHumanResourceRequest[];
  userCodeInCharge: string;
  userNameInCharge: string;
}

export type HumanResourceRequests = HumanResourceRequest[];
