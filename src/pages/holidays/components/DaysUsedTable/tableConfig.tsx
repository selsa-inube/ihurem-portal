import { labels } from "@i18n/labels";

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
    label: labels.holidays.daysUsed.headers.startDate,
    key: "startDate",
    style: { width: "auto" },
  },
  {
    label: labels.holidays.daysUsed.headers.usageMode,
    key: "usageMode",
    style: { width: "auto" },
  },
  {
    label: labels.holidays.daysUsed.headers.days,
    key: "days",
    style: { width: "auto" },
  },
];

export const pageLength = 10;
export const caption = "Tabla de Ejemplo";
