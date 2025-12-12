import { labels } from "@i18n/labels";

export const columns = [
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "70px" } },
];

export const headers = [
  {
    label:
      labels.absences.reportAbsence.ui.requirementsForm.table.headers.document,
    key: "document",
    align: "left",
    style: { width: "auto" },
  },
  {
    label:
      labels.absences.reportAbsence.ui.requirementsForm.table.headers.attach,
    key: "attach",
    align: "center",
    style: { width: "70px" },
  },
];
