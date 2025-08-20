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
  alary_increase = "Ascenso salarial",
  unpaid_leave = "Licencia no remunerada",
  vacations_enjoyed = "Vacaciones Disfrutadas",
}

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
