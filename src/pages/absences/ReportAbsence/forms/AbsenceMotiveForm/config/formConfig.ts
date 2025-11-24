import { IOption } from "@inubekit/inubekit";

const absenceMotiveFormRequiredFields = {
  motive: true,
  subMotive: true,
  observations: true,
};

const motiveSelectMock: IOption[] = [
  {
    id: "1",
    label: "Permisos remunerados",
    value: "paidLeaves",
  },
  {
    id: "2",
    label: "Licencias no remuneradas",
    value: "unpaidLeaves",
  },
  {
    id: "3",
    label: "Enfermedad personal",
    value: "personalIllness",
  },
  {
    id: "4",
    label: "Accidente personal",
    value: "personalAccident",
  },
  {
    id: "5",
    label: "Calamidad",
    value: "calamity",
  },
];

const suvMotiveSelectMock: IOption[] = [
  {
    id: "1",
    label: "Cita médica personal o familiar",
    value: "personalOrFamilyMedicalAppointment",
  },
  {
    id: "2",
    label: "Diligencias personales",
    value: "personalErrands",
  },
  {
    id: "3",
    label: "Trámites judiciales o legales",
    value: "judicialOrLegalProcedures",
  },
  {
    id: "4",
    label: "Deberes cívicos",
    value: "civicDuties",
  },
  {
    id: "5",
    label: "Permiso sindical",
    value: "unionLeave",
  },
];

enum AbsenceMotive {
  PaidLeaves = "paidLeaves",
  UnpaidLeaves = "unpaidLeaves",
  PersonalIllness = "personalIllness",
  PersonalAccident = "personalAccident",
  Calamity = "calamity",
}

enum SubMotive {
  PersonalOrFamilyMedicalAppointment = "personalOrFamilyMedicalAppointment",
  PersonalErrands = "personalErrands",
  JudicialOrLegalProcedures = "judicialOrLegalProcedures",
  CivicDuties = "civicDuties",
  UnionLeave = "unionLeave",
}

const labelsAbsenceMap: Record<string, string> = {
  [AbsenceMotive.PaidLeaves]: "Permisos remunerados",
  [AbsenceMotive.UnpaidLeaves]: "Licencias no remuneradas",
  [AbsenceMotive.PersonalIllness]: "Enfermedad personal",
  [AbsenceMotive.PersonalAccident]: "Accidente personal",
  [AbsenceMotive.Calamity]: "Calamidad",
  [SubMotive.PersonalOrFamilyMedicalAppointment]:
    "Cita médica personal o familiar",
  [SubMotive.PersonalErrands]: "Diligencias personales",
  [SubMotive.JudicialOrLegalProcedures]: "Trámites judiciales o legales",
  [SubMotive.CivicDuties]: "Deberes cívicos",
  [SubMotive.UnionLeave]: "Permiso sindical",
};

export {
  absenceMotiveFormRequiredFields,
  motiveSelectMock,
  suvMotiveSelectMock,
  labelsAbsenceMap,
};
