import { labels } from "@i18n/labels";

export const columns = [
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "70px" } },
];

export const headers = [
  {
    label: labels.modals.uploadDocumentsTable.documentRequested,
    key: "document",
    align: "left",
    style: { width: "auto" },
  },
  {
    label: labels.modals.uploadDocumentsTable.attach,
    key: "attach",
    align: "center",
    style: { width: "70px" },
  },
];
