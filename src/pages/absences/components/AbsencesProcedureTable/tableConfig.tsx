import { IAbsencesProcedureTable } from "./types";

export const columns = [
  { span: 1, style: { width: "30%" } },
  { span: 1, style: { width: "15%" } },
  { span: 1, style: { width: "15%" } },
  { span: 1, style: { width: "25%" } },
  { span: 1, style: { width: "auto" } },
];

export interface ExtendedIAbsencesProcedureTable
  extends IAbsencesProcedureTable {
  actions?: { value: JSX.Element };
  mobileActions?: { value: JSX.Element };
}

export const headers: {
  label: string;
  key: keyof ExtendedIAbsencesProcedureTable;
  action?: boolean;
  style?: React.CSSProperties;
}[] = [
  { label: "Motivo", key: "reason" },
  { label: "Fecha de inicio", key: "date" },
  { label: "Duración", key: "duration" },
  { label: "Estado", key: "state" },
  { label: "Acciones", key: "actions", action: true },
];

export const pageLength = 10;
export const caption = "Consulta de solicitudes en trámite";
