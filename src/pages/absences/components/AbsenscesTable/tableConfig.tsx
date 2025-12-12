import { labels } from "@i18n/labels";
import { IAbsencesTable } from "./types";

export const columns = [
  { span: 1, style: { width: "40%" } },
  { span: 1, style: { width: "20%" } },
  { span: 1, style: { width: "20%" } },
  { span: 1, style: { width: "10%" } },
];

export interface ExtendedIAbsencesTable extends IAbsencesTable {
  mobileActions?: { value: JSX.Element };
  actions?: { value: JSX.Element };
}

export const headers = [
  {
    label: labels.absences.procedure.details.motive,
    key: "reason",
    style: { width: "auto" },
  },
  {
    label: labels.absences.procedure.details.startDate,
    key: "date",
    style: { width: "20%" },
  },
  {
    label: labels.absences.procedure.details.durationDays,
    key: "duration",
    style: { width: "20%" },
  },
  {
    label: labels.absences.procedure.headers.actions,
    key: "actions",
    style: { width: "10%" },
  },
];

export const pageLength = 10;

export const caption = labels.absences.breadcrumbs.description;
