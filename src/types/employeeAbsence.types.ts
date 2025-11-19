export const AbsenceReasonES: Record<string, string> = {
  leave: "Permiso",
  sickness: "Enfermedad",
  vacation: "Vacaciones",
  maternity: "Maternidad",
  paternity: "Paternidad",
  personal: "Personal",
};

export const AbsenceSubReasonES: Record<string, string> = {
  personal_errands: "Diligencias personales",
  medical_appointment: "Cita médica",
  family_emergency: "Emergencia familiar",
  administrative: "Trámite administrativo",
  other: "Otro",
};

export interface EmployeeAbsence {
  absenceDays: number;
  absenceId: string;
  absenceReason: string;
  absenceReasonDetails: string;
  absenceStartDate: string;
  absenceStartHour: number;
  contractId: string;
  employeeId: string;
  hoursAbsent: number;
  subReason: string;
}
