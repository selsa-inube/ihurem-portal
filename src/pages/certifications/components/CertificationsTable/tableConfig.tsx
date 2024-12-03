import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import { ICertificationsTable } from "./types";

export const columns = [
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "70px" } },
  { span: 1, style: { width: "80px" } },
];

interface ExtendedIHolidaysTable extends ICertificationsTable {
  mobileActions?: { value: JSX.Element };
  type?: { value: string };
}

export const headers: {
  label: string;
  key: keyof ExtendedIHolidaysTable;
  action?: boolean;
  style?: React.CSSProperties;
}[] = [
  { label: "Número", key: "description", style: { width: "auto" } },
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
export const caption = "Tabla de Ejemplo";

export const generateData = () => {
  const rows = 2;
  const data: ICertificationsTable[] = [];
  for (let i = 0; i < rows; i++) {
    data.push({
      description: {
        value: i % 2 === 0 ? "1234" : "9876",
      },
      date: { value: "20/Ene/2024" },
      type: {
        value: i % 2 === 0 ? "Certificado" : "Certificado",
      },
      status: {
        value:
          i % 2 === 0 ? "En trámite de aprobación" : "En trámite de validación",
      },
      details: {
        value: <MdOutlineVisibility />,
        type: "icon",
        onClick: () => console.log(`View details clicked for row ${i}`),
      },
      delete: {
        value: <MdDeleteOutline />,
        type: "icon",
        onClick: () => console.log(`Delete clicked for row ${i}`),
      },
    });
  }
  return data;
};
