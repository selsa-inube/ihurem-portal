import { IHolidaysTable } from "./types";

export const columns = [
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "70px" } },
  { span: 1, style: { width: "80px" } },
];

interface ExtendedIHolidaysTable extends IHolidaysTable {
  mobileActions?: { value: JSX.Element };
  type?: { value: string };
}

export const headers: {
  label: string;
  key: keyof ExtendedIHolidaysTable;
  action?: boolean;
  style?: React.CSSProperties;
}[] = [
  {
    label: "Tipo de solicitud de vacaciones",
    key: "description",
    style: { width: "auto" },
  },
  { label: "Fecha de solicitud", key: "date", style: { width: "auto" } },
  { label: "Cantidad de días hábiles", key: "days", style: { width: "auto" } },
  { label: "Estado de la solicitud", key: "status", style: { width: "auto" } },
  {
    label: "Ver detalles de la solicitud",
    key: "details",
    action: true,
    style: { width: "60px" },
  },
  {
    label: "Eliminar solicitud",
    key: "delete",
    action: true,
    style: { width: "60px" },
  },
];

export const pageLength = 10;
export const caption = "Solicitudes de vacaciones en trámite";
