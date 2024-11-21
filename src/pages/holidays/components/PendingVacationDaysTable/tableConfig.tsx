import { IPendingVacationDaysTable } from "./types";

export const columns = [
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
];

interface ExtendedIPendingVacationDaysTable extends IPendingVacationDaysTable {
  mobileActions?: { value: JSX.Element };
  type?: { value: string };
}

export const headers: {
  label: string;
  key: keyof ExtendedIPendingVacationDaysTable;
  action?: boolean;
  style?: React.CSSProperties;
}[] = [
  { label: "Fecha de inicio", key: "start_date", style: { width: "auto" } },
  { label: "Concepto", key: "concept", style: { width: "auto" } },
  { label: "Días", key: "days", style: { width: "auto" } },
];

export const pageLength = 5;

export const generateData = () => {
  const rows = 2;
  const data: IPendingVacationDaysTable[] = [];
  for (let i = 0; i < rows; i++) {
    data.push({
      concept: {
        value: i % 2 === 0 ? "Pago de vacaciones" : "Disfrute de vacaciones",
      },
      start_date: { value: i % 2 === 0 ? "28/Sep/2024" : "15/Ene/2024" },
      days: { value: i % 2 === 0 ? 7 : 15 },
    });
  }
  return data;
};
