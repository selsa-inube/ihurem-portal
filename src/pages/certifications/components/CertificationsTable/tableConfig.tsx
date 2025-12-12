import { labels } from "@i18n/labels";

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
  {
    label: labels.certifications.table.requestNumber,
    key: "requestNumber",
    style: { width: "auto" },
  },
  {
    label: labels.certifications.table.certificationType,
    key: "type",
    style: { width: "auto" },
  },
  {
    label: labels.certifications.table.requestDate,
    key: "date",
    style: { width: "auto" },
  },
  {
    label: labels.certifications.table.requestStatus,
    key: "status",
    style: { width: "auto" },
  },
  {
    label: labels.certifications.table.viewDetails,
    key: "details",
    action: true,
    style: { width: "60px" },
  },
  {
    label: labels.certifications.table.deleteRequest,
    key: "delete",
    action: true,
    style: { width: "60px" },
  },
];

export const pageLength = 10;
