import { labels } from "@i18n/labels";

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
    label: labels.holidays.inProgressTable.headers.requestType,
    key: "description",
    style: { width: "auto" },
  },
  {
    label: labels.holidays.inProgressTable.headers.requestDate,
    key: "date",
    style: { width: "auto" },
  },
  {
    label: labels.holidays.inProgressTable.headers.businessDays,
    key: "days",
    style: { width: "auto" },
  },
  {
    label: labels.holidays.inProgressTable.headers.status,
    key: "status",
    style: { width: "auto" },
  },
  {
    label: labels.holidays.inProgressTable.headers.viewDetails,
    key: "details",
    action: true,
    style: { width: "60px" },
  },
  {
    label: labels.holidays.inProgressTable.headers.delete,
    key: "delete",
    action: true,
    style: { width: "60px" },
  },
];

export const pageLength = 10;
export const caption = "Solicitudes de vacaciones en trámite";
