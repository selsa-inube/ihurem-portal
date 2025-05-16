import { ICertificationsTable, CertificationsTableField } from "./types";

export const columns = [
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "70px" } },
  { span: 1, style: { width: "80px" } },
];

interface ExtendedIHolidaysTable extends ICertificationsTable {
  mobileActions?: CertificationsTableField<JSX.Element>;
  type: CertificationsTableField<string>;
}

export const headers: {
  label: string;
  key: keyof ExtendedIHolidaysTable;
  action?: boolean;
  style?: React.CSSProperties;
}[] = [
  { label: "Número", key: "requestNumber", style: { width: "auto" } },
  { label: "Tipo", key: "type", style: { width: "auto" } },
  { label: "Fecha", key: "date", style: { width: "auto" } },
  { label: "Estado", key: "status", style: { width: "auto" } },
  {
    label: "Detalles",
    key: "details",
    action: true,
    style: { width: "60px" },
  },
  { label: "Eliminar", key: "delete", action: true, style: { width: "60px" } },
];

export const pageLength = 5;
