export enum ERequestType {
  absence = "Ausencia",
  certification = "Certificación",
  disability = "Incapacidad",
  leave = "Permiso",
  leaving_the_job = "Retiro",
  onboarding = "Vinculación",
  paid_vacations = "Vacaciones Pagadas",
  position_transfer = "Traslado de cargo",
  pqr = "PQR",
  salary_increase = "Ascenso salarial",
  unpaid_leave = "Licencia no remunerada",
  vacations_enjoyed = "Vacaciones Disfrutadas",
}
export const requestTypeMap: Record<ERequestType, string> = {
  [ERequestType.absence]: "absence",
  [ERequestType.certification]: "certification",
  [ERequestType.disability]: "disability",
  [ERequestType.leave]: "leave",
  [ERequestType.leaving_the_job]: "leaving_the_job",
  [ERequestType.onboarding]: "onboarding",
  [ERequestType.paid_vacations]: "paid_vacations",
  [ERequestType.position_transfer]: "position_transfer",
  [ERequestType.pqr]: "pqr",
  [ERequestType.salary_increase]: "salary_increase",
  [ERequestType.unpaid_leave]: "unpaid_leave",
  [ERequestType.vacations_enjoyed]: "vacations_enjoyed",
};

export const requestTypeLabels: Record<ERequestType, string> = {
  [ERequestType.absence]: "Ausencia",
  [ERequestType.certification]: "Certificación",
  [ERequestType.disability]: "Incapacidad",
  [ERequestType.leave]: "Permiso",
  [ERequestType.leaving_the_job]: "Retiro",
  [ERequestType.onboarding]: "Vinculación",
  [ERequestType.paid_vacations]: "Vacaciones Pagadas",
  [ERequestType.position_transfer]: "Traslado de cargo",
  [ERequestType.pqr]: "PQR",
  [ERequestType.salary_increase]: "Ascenso salarial",
  [ERequestType.unpaid_leave]: "Licencia no remunerada",
  [ERequestType.vacations_enjoyed]: "Vacaciones Disfrutadas",
};

export enum ETaskStatus {
  assigned = "Asignada",
  executed = "Ejecutada",
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
  closed = "Cerrada",
  rejected = "Rechazada",
  canceled = "Cancelada",
  supervisor_approval = "Aprobacion Jefe Inmediato",
  HR_compliance_verification = "Verificacion en Gestion Humana",
  confirmation_of_vacation_taken = "Confirmacion Disfrute de vacaciones",
  successfully_processed = "Tramitada con Exito",
  certification_generation = "Generacion de la certificacion",
  onboarding_in_progress = "Vinculación en Progreso",
  pending_registration_invitation = "Pendiente de Invitacion para registro",
  pending_to_complete_registration = "Pendiente de completar registro",
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
