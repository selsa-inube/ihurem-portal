const statusRequirement = [
  { status: "Meets", name: "Cumple", appearance: "success" },
  { status: "NotMeets", name: "No Cumple", appearance: "danger" },
  { status: "NoMeets", name: "No Cumple", appearance: "danger" },
  { status: "NoEvaluated", name: "Sin Evaluar", appearance: "warning" },
  { status: "Undefined", name: "No Definido", appearance: "gray" },
];

const evaluationStatusRequirement = [
  {
    status: "ERROR_IN_EVALUATION",
    name: "Error en evaluación",
    appearance: "danger",
  },
  { status: "UNVALIDATED", name: "No Valido", appearance: "danger" },
  {
    status: "PASSED_WITH_SYSTEM_VALIDATION",
    name: "Validación sistema cumplida",
    appearance: "success",
  },
  {
    status: "PASSED_WITH_HUMAN_VALIDATION",
    name: "Validación humana cumplida",
    appearance: "success",
  },
  {
    status: "FAILED_SYSTEM_VALIDATION",
    name: "Validacion del sistema NO cumplida",
    appearance: "warning",
  },
  {
    status: "DOCUMENT_NOT_LOADED",
    name: "Documento NO cargado",
    appearance: "danger",
  },
  {
    status: "DOCUMENT_STORED_WITHOUT_VALIDATION",
    name: "Documento almacenado sin validación",
    appearance: "warning",
  },
  {
    status: "DOCUMENT_STORED_AND_VALIDATED",
    name: "Documento almacenado y cargado",
    appearance: "success",
  },
];

enum RequirementTypeNormalize {
  SYSTEM_VALIDATION = "Validación del sistema",
  DOCUMENT = "Documento",
  HUMAN_VALIDATION = "Validación humana",
}

const normalizeStatusRequirementByStatus = (requirement: string) =>
  statusRequirement.find((element) => element.status === requirement);

const normalizeStatusRequirementByName = (requirement: string) =>
  statusRequirement.find((element) => element.name === requirement);

const normalizeEvalStatusRequirementByStatus = (requirement: string) =>
  evaluationStatusRequirement.find((element) => element.status === requirement);

const normalizeEvalStatusRequirementByName = (requirement: string) =>
  evaluationStatusRequirement.find((element) => element.name === requirement);

export {
  statusRequirement,
  RequirementTypeNormalize,
  normalizeStatusRequirementByStatus,
  normalizeStatusRequirementByName,
  normalizeEvalStatusRequirementByStatus,
  normalizeEvalStatusRequirementByName,
};
