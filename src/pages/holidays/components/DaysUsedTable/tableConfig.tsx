import { IDaysUsedTable } from "./types";

export const columns = [
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "60px" } },
];

export const headers: {
  label: string;
  key: keyof IDaysUsedTable;
  action?: boolean;
  style?: React.CSSProperties;
}[] = [
  {
    label: "Fecha de inicio o pago",
    key: "startDate",
    style: { width: "auto" },
  },
  { label: "Modalidad de uso", key: "usageMode", style: { width: "auto" } },
  { label: "Días", key: "days", style: { width: "auto" } },
];

export const pageLength = 5;
export const caption = "Tabla de Ejemplo";
