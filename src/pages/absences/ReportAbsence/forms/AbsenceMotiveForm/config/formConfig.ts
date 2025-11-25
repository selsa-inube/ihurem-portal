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
    value: "paid_leaves",
  },
  {
    id: "2",
    label: "Licencias no remuneradas",
    value: "unpaid_leaves",
  },
  {
    id: "3",
    label: "Enfermedad personal",
    value: "personal_illness",
  },
  {
    id: "4",
    label: "Accidente personal",
    value: "personal_accident",
  },
  {
    id: "5",
    label: "Calamidad",
    value: "calamity",
  },
  {
    id: "6",
    label: "Permiso",
    value: "leave",
  },
  {
    id: "7",
    label: "Vacaciones",
    value: "vacation",
  },
  {
    id: "8",
    label: "Permiso personal",
    value: "personal_leave",
  },
  {
    id: "9",
    label: "Emergencia familiar",
    value: "family_emergency",
  },
  {
    id: "10",
    label: "Cita médica",
    value: "medical_appointment",
  },
  {
    id: "11",
    label: "Cita médica personal o familiar",
    value: "personal_or_family_medical_appointment",
  },
];

const suvMotiveSelectMock: IOption[] = [
  {
    id: "1",
    label: "Emergencia familiar",
    value: "family_emergency",
  },
  {
    id: "2",
    label: "Cita médica personal o familiar",
    value: "personal_or_family_medical_appointment",
  },
  {
    id: "3",
    label: "Cita médica",
    value: "medical_appointment",
  },
  {
    id: "4",
    label: "Permiso personal",
    value: "personal_leave",
  },
  {
    id: "5",
    label: "Vacaciones",
    value: "vacation",
  },
  {
    id: "6",
    label: "Diligencias personales",
    value: "personal_errands",
  },
  {
    id: "7",
    label: "Trámites judiciales o legales",
    value: "judicial_or_legal_procedures",
  },
  {
    id: "8",
    label: "Deberes cívicos",
    value: "civic_duties",
  },
  {
    id: "9",
    label: "Permiso sindical",
    value: "union_permission",
  },
  {
    id: "10",
    label: "Estudio o capacitación",
    value: "study_or_training",
  },
  {
    id: "11",
    label: "Motivo personal",
    value: "personal_reason",
  },
  {
    id: "12",
    label: "Viaje personal prolongado",
    value: "prolonged_personal_trip",
  },
  {
    id: "13",
    label: "Atención a familiar dependiente",
    value: "dependent_family_care",
  },
  {
    id: "14",
    label: "Estudio o formación",
    value: "study_or_education",
  },
  {
    id: "15",
    label: "Otro motivo",
    value: "other_reason",
  },
  {
    id: "16",
    label: "Enfermedad general",
    value: "general_illness",
  },
  {
    id: "17",
    label: "Recuperación postoperatoria",
    value: "postoperative_recovery",
  },
  {
    id: "18",
    label: "Tratamiento médico especializado",
    value: "specialized_medical_treatment",
  },
  {
    id: "19",
    label: "Enfermedad contagiosa",
    value: "contagious_disease",
  },
  {
    id: "20",
    label: "Recuperación por enfermedad",
    value: "illness_recovery",
  },
  {
    id: "21",
    label: "Accidente doméstico",
    value: "domestic_accident",
  },
  {
    id: "22",
    label: "Accidente deportivo o recreativo",
    value: "sports_or_recreational_accident",
  },
  {
    id: "23",
    label: "Accidente de tránsito",
    value: "traffic_accident",
  },
  {
    id: "24",
    label: "Rehabilitación post-accidente",
    value: "post_accident_rehabilitation",
  },
  {
    id: "25",
    label: "Daño grave de vivienda",
    value: "severe_housing_damage",
  },
  {
    id: "26",
    label: "Accidente o enfermedad grave de familiar directo",
    value: "serious_accident_or_illness_of_direct_family",
  },
  {
    id: "27",
    label: "Emergencia familiar por desastre natural",
    value: "family_emergency_due_to_natural_disaster",
  },
  {
    id: "28",
    label: "Fallecimiento de familiar en primer grado",
    value: "death_of_first_degree_relative",
  },
  {
    id: "29",
    label: "Fallecimiento de familiar en segundo grado",
    value: "death_of_second_degree_relative",
  },
  {
    id: "30",
    label: "Fallecimiento de otro pariente cercano",
    value: "death_of_other_close_relative",
  },
  {
    id: "31",
    label: "Fallecimiento de la mascota de la familia",
    value: "death_of_family_pet",
  },
];

export {
  absenceMotiveFormRequiredFields,
  motiveSelectMock,
  suvMotiveSelectMock,
};
