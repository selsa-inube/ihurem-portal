import { IDocument } from "@pages/absences/ReportAbsence/forms/RequiredDocumentsForm/RequiredDocumentsTable/types";

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

export enum ELeaveReason {
  paid_leaves = "paid_leaves",
  unpaid_leave = "unpaid_leave",
  personal_illness = "personal_illness",
  personal_accident = "personal_accident",
  calamity = "calamity",
  leave = "leave",
  vacation = "vacation",
  personal_leave = "personal_leave",
  family_emergency = "family_emergency",
  medical_appointment = "medical_appointment",
  personal_or_family_medical_appointment = "personal_or_family_medical_appointment",
  mourning = "mourning",
}

export const leaveReasonLabels: Record<ELeaveReason, string> = {
  [ELeaveReason.paid_leaves]: "Permisos remunerados",
  [ELeaveReason.unpaid_leave]: "Licencias no remuneradas",
  [ELeaveReason.personal_illness]: "Enfermedad personal",
  [ELeaveReason.personal_accident]: "Accidente personal",
  [ELeaveReason.calamity]: "Calamidad",
  [ELeaveReason.leave]: "Permiso",
  [ELeaveReason.vacation]: "Vacaciones",
  [ELeaveReason.personal_leave]: "Permiso personal",
  [ELeaveReason.family_emergency]: "Emergencia familiar",
  [ELeaveReason.medical_appointment]: "Cita médica",
  [ELeaveReason.personal_or_family_medical_appointment]:
    "Cita médica personal o familiar",
  [ELeaveReason.mourning]: "Luto",
};

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

export enum EAbsenceReason {
  family_emergency = "family_emergency",
  personal_or_family_medical_appointment = "personal_or_family_medical_appointment",
  medical_appointment = "medical_appointment",
  personal_leave = "personal_leave",
  vacation = "vacation",
  personal_errands = "personal_errands",
  judicial_or_legal_procedures = "judicial_or_legal_procedures",
  civic_duties = "civic_duties",
  union_permission = "union_permission",
  study_or_training = "study_or_training",
  personal_reason = "personal_reason",
  prolonged_personal_trip = "prolonged_personal_trip",
  dependent_family_care = "dependent_family_care",
  study_or_education = "study_or_education",
  other_reason = "other_reason",
  general_illness = "general_illness",
  postoperative_recovery = "postoperative_recovery",
  specialized_medical_treatment = "specialized_medical_treatment",
  contagious_disease = "contagious_disease",
  illness_recovery = "illness_recovery",
  domestic_accident = "domestic_accident",
  sports_or_recreational_accident = "sports_or_recreational_accident",
  traffic_accident = "traffic_accident",
  post_accident_rehabilitation = "post_accident_rehabilitation",
  severe_housing_damage = "severe_housing_damage",
  serious_accident_or_illness_of_direct_family = "serious_accident_or_illness_of_direct_family",
  family_emergency_due_to_natural_disaster = "family_emergency_due_to_natural_disaster",
  death_of_first_degree_relative = "death_of_first_degree_relative",
  death_of_second_degree_relative = "death_of_second_degree_relative",
  death_of_other_close_relative = "death_of_other_close_relative",
  death_of_family_pet = "death_of_family_pet",
}

export const absenceReasonLabels: Record<EAbsenceReason, string> = {
  [EAbsenceReason.family_emergency]: "Emergencia familiar",
  [EAbsenceReason.personal_or_family_medical_appointment]:
    "Cita médica personal o familiar",
  [EAbsenceReason.medical_appointment]: "Cita médica",
  [EAbsenceReason.personal_leave]: "Permiso personal",
  [EAbsenceReason.vacation]: "Vacaciones",

  [EAbsenceReason.personal_errands]: "Diligencias personales",
  [EAbsenceReason.judicial_or_legal_procedures]:
    "Trámites judiciales o legales",
  [EAbsenceReason.civic_duties]: "Deberes cívicos",
  [EAbsenceReason.union_permission]: "Permiso sindical",
  [EAbsenceReason.study_or_training]: "Estudio o capacitación",
  [EAbsenceReason.personal_reason]: "Motivo personal",
  [EAbsenceReason.prolonged_personal_trip]: "Viaje personal prolongado",
  [EAbsenceReason.dependent_family_care]: "Atención a familiar dependiente",
  [EAbsenceReason.study_or_education]: "Estudio o formación",
  [EAbsenceReason.other_reason]: "Otro motivo",

  [EAbsenceReason.general_illness]: "Enfermedad general",
  [EAbsenceReason.postoperative_recovery]: "Recuperación postoperatoria",
  [EAbsenceReason.specialized_medical_treatment]:
    "Tratamiento médico especializado",
  [EAbsenceReason.contagious_disease]: "Enfermedad contagiosa",
  [EAbsenceReason.illness_recovery]: "Recuperación por enfermedad",

  [EAbsenceReason.domestic_accident]: "Accidente doméstico",
  [EAbsenceReason.sports_or_recreational_accident]:
    "Accidente deportivo o recreativo",
  [EAbsenceReason.traffic_accident]: "Accidente de tránsito",
  [EAbsenceReason.post_accident_rehabilitation]:
    "Rehabilitación post-accidente",

  [EAbsenceReason.severe_housing_damage]: "Daño grave de vivienda",
  [EAbsenceReason.serious_accident_or_illness_of_direct_family]:
    "Accidente o enfermedad grave de familiar directo",
  [EAbsenceReason.family_emergency_due_to_natural_disaster]:
    "Emergencia familiar por desastre natural",

  [EAbsenceReason.death_of_first_degree_relative]:
    "Fallecimiento de familiar en primer grado",
  [EAbsenceReason.death_of_second_degree_relative]:
    "Fallecimiento de familiar en segundo grado",
  [EAbsenceReason.death_of_other_close_relative]:
    "Fallecimiento de otro pariente cercano",
  [EAbsenceReason.death_of_family_pet]:
    "Fallecimiento de la mascota de la familia",
};

export enum ETaskStatus {
  assigned = "assigned",
  executed = "executed",
  pending = "PENDING",
  completed = "COMPLETED",
  failed = "FAILED",
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
  contractId?: string;
  contractNumber?: string;
  businessName?: string;
  contractType?: string;
  observationEmployee?: string;
  daysToPay?: string;
  disbursementDate?: string;
  daysOff?: string;
  startDateEnyoment?: string;
  certificationType?: string;
  addressee?: string;
  durationOfDays?: number;
  reason?: EAbsenceReason;
  subReason?: string;
  motifDetail?: string;
  startDate?: string;
  motive?: string;
  subMotive?: string;
  motiveDetails?: string;
  daysDuration?: string;
  hoursDuration?: string;
  startTime?: string;
  documents?: IDocument[];
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

export interface HumanResourceRequestBlockingPerTask {
  blockType: string;
  description: string;
  errorId: string;
  registrationDate: string;
  taskManagingId: string;
}

export interface TaskToManageHumanResourceRequestApi {
  description: string;
  humanResourceRequestId: string;
  identificationDocumentNumber: string;
  positionName: string;
  staffLastName: string;
  staffName: string;
  taskCode: string;
  taskManagingId: string;
  taskName: string;
  taskStatus: string;
  humanResourceRequestBlockingPerTask: HumanResourceRequestBlockingPerTask[];
}

export interface HumanResourceRequestTraceabilityApi {
  actionExecuted: string;
  description: string;
  executionDate: string;
  humanResourceRequestId: string;
  traceabilityId: string;
  userWhoExecutedAction: string;
}

export interface HumanResourceRequestApi {
  employeeId: string;
  humanResourceRequestData: string;
  humanResourceRequestDate: string;
  humanResourceRequestDescription: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestStatus: string;
  humanResourceRequestTraceabilities: HumanResourceRequestTraceabilityApi[];
  humanResourceRequestType: string;
  tasksToManageTheHumanResourcesRequests: TaskToManageHumanResourceRequestApi[];
}

export type HumanResourceRequests = HumanResourceRequest[];
