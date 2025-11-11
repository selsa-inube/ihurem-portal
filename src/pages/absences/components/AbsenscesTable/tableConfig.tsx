import { IAbsencesTable } from "./types";

export const columns = [
  { span: 1, style: { width: "40%" } },
  { span: 1, style: { width: "20%" } },
  { span: 1, style: { width: "20%" } },
  { span: 1, style: { width: "10%" } },
];

export interface ExtendedIAbsencesTable extends IAbsencesTable {
  mobileActions?: { value: JSX.Element };
  actions?: { value: JSX.Element };
}

export const headers: {
  label: string;
  key: keyof ExtendedIAbsencesTable;
  action?: boolean;
  style?: React.CSSProperties;
}[] = [
  { label: "Motivo", key: "reason", style: { width: "auto" } },
  { label: "Fecha en que se produjo", key: "date", style: { width: "20%" } },
  { label: "Duración", key: "duration", style: { width: "20%" } },
  { label: "Acciones", key: "actions", style: { width: "10%" } },
];

export const pageLength = 10;
export const caption = "Consulta de ausencias del empleado";
