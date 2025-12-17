export interface RequirementDetailItem {
  label: string;
  value: string;
}

export const mockRequirementDetail: RequirementDetailItem[] = [
  {
    label: "¿Quieres aprobar el requisito aunque no se pudo evaluar?",
    value: "Sí, aprobar requisito.",
  },
  {
    label: "Observaciones",
    value:
      "Aunque el sistema no pudo validar, revisando la cédula se evidencia que el asociado es mayor de 30 años.",
  },
];
