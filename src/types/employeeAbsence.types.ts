export const AbsenceReasonES: Record<string, string> = {
  leave: "Permisos",
  unpaid_leave: "Licencias no remuneradas",
  personal_illness: "Enfermedad personal",
  personal_accident: "Accidente personal",
  calamity: "Calamidad",
  mourning: "Luto",
};

export const AbsenceSubReasonES: Record<string, string> = {
  personal_errands: "Diligencias personales",
  medical_appointment: "Cita médica",
  family_emergency: "Emergencia familiar",
  administrative: "Trámite administrativo",
  other: "Otro",
};

export enum ESubReason {
  PersonalOrFamilyMedicalAppointment = "personal_or_family_medical_appointment",
  PersonalErrands = "personal_errands",
  JudicialOrLegalProcedures = "judicial_or_legal_procedures",
  CivicDuties = "civic_duties",
  UnionPermission = "union_permission",
  StudyOrTraining = "study_or_training",
  PersonalReason = "personal_reason",
  ProlongedPersonalTrip = "prolonged_personal_trip",
  DependentFamilyCare = "dependent_family_care",
  StudyOrEducation = "study_or_education",
  OtherReason = "other_reason",
  GeneralIllness = "general_illness",
  PostoperativeRecovery = "postoperative_recovery",
  SpecializedMedicalTreatment = "specialized_medical_treatment",
  ContagiousDisease = "contagious_disease",
  IllnessRecovery = "illness_recovery",
  DomesticAccident = "domestic_accident",
  SportsOrRecreationalAccident = "sports_or_recreational_accident",
  TrafficAccident = "traffic_accident",
  PostAccidentRehabilitation = "post_accident_rehabilitation",
  SevereHousingDamage = "severe_housing_damage",
  SeriousAccidentOrIllnessOfDirectFamily = "serious_accident_or_illness_of_direct_family",
  FamilyEmergencyDueToNaturalDisaster = "family_emergency_due_to_natural_disaster",
  DeathOfFirstDegreeRelative = "death_of_first_degree_relative",
  DeathOfSecondDegreeRelative = "death_of_second_degree_relative",
  DeathOfOtherCloseRelative = "death_of_other_close_relative",
  DeathOfFamilyPet = "death_of_family_pet",
}

export const ESubReasonES: Record<ESubReason, string> = {
  [ESubReason.PersonalOrFamilyMedicalAppointment]:
    "Cita médica personal o familiar",
  [ESubReason.PersonalErrands]: "Diligencias personales",
  [ESubReason.JudicialOrLegalProcedures]: "Trámites judiciales o legales",
  [ESubReason.CivicDuties]: "Deberes cívicos",
  [ESubReason.UnionPermission]: "Permiso sindical",
  [ESubReason.StudyOrTraining]: "Estudio o capacitación",
  [ESubReason.PersonalReason]: "Motivo personal",
  [ESubReason.ProlongedPersonalTrip]: "Viaje personal prolongado",
  [ESubReason.DependentFamilyCare]: "Atención a familiar dependiente",
  [ESubReason.StudyOrEducation]: "Estudio o formación",
  [ESubReason.OtherReason]: "Otro motivo",

  [ESubReason.GeneralIllness]: "Enfermedad general",
  [ESubReason.PostoperativeRecovery]: "Recuperación postoperatorio",
  [ESubReason.SpecializedMedicalTreatment]: "Tratamiento médico especializado",
  [ESubReason.ContagiousDisease]: "Enfermedad contagiosa",
  [ESubReason.IllnessRecovery]: "Recuperación de enfermedad",

  [ESubReason.DomesticAccident]: "Accidente doméstico",
  [ESubReason.SportsOrRecreationalAccident]: "Accidente deportivo o recreativo",
  [ESubReason.TrafficAccident]: "Accidente de tránsito",
  [ESubReason.PostAccidentRehabilitation]: "Rehabilitación post-accidente",

  [ESubReason.SevereHousingDamage]: "Daño grave de vivienda",
  [ESubReason.SeriousAccidentOrIllnessOfDirectFamily]:
    "Accidente o enfermedad grave de familiar directo",
  [ESubReason.FamilyEmergencyDueToNaturalDisaster]:
    "Emergencia familiar por desastre natural",

  [ESubReason.DeathOfFirstDegreeRelative]:
    "Fallecimiento de familiar en primer grado",
  [ESubReason.DeathOfSecondDegreeRelative]:
    "Fallecimiento de familiar en segundo grado",
  [ESubReason.DeathOfOtherCloseRelative]:
    "Fallecimiento de otro pariente cercano",
  [ESubReason.DeathOfFamilyPet]: "Fallecimiento de mascota de la familia",
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
