import { IAbsencesTable } from "./types";

export const columns = [
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "140px" } },
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
  { label: "Fecha en que se produjo", key: "date", style: { width: "auto" } },
  { label: "Duración", key: "duration", style: { width: "auto" } },
  {
    label: "Acciones",
    key: "actions",
  },
];

export const pageLength = 10;
export const caption = "Consulta de ausencias del empleado";
