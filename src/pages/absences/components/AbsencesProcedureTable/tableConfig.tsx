import { labels } from "@i18n/labels";

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
  {
    label: labels.absences.procedure.details.motive,
    key: "reason",
  },
  {
    label: labels.absences.procedure.details.startDate,
    key: "date",
  },
  {
    label: labels.absences.procedure.details.durationDays,
    key: "duration",
  },
  {
    label: labels.absences.procedure.headers.status,
    key: "state",
  },
  {
    label: labels.absences.procedure.headers.actions,
    key: "actions",
    action: true,
  },
];

export const pageLength = 10;
export const caption = labels.absences.procedure.table.caption;
