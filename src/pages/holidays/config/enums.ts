export enum AuthorizationStatus {
  AUTHORIZED = "Autorizado",
  NOT_AUTHORIZED = "No autorizado",
  PROCESS_APPROVAL = "En trámite de aprobación",
  PROCESS_VALIDATION = "En trámite de validación",
}

export enum VacationType {
  ENJOY_HOLIDAYS = "Disfrute de vacaciones",
  ACCUMULATED_HOLIDAYS = "Vacaciones acumuladas",
  HOLIDAYS_PAYMENT = "Pago de vacaciones",
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
