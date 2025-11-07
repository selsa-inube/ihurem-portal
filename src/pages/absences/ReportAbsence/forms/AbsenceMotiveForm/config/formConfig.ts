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

export {
  absenceMotiveFormRequiredFields,
  motiveSelectMock,
  suvMotiveSelectMock,
};
