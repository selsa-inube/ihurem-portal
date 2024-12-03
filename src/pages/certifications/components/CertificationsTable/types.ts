export interface ICertificationsTable {
  description: CertificationsTableField<string>;
  date: CertificationsTableField<string>;
  status: CertificationsTableField<string>;
  details: CertificationsTableDetails;
  delete: CertificationsTableAction;
  type?: CertificationsTableField<string>;
  mobileActions?: CertificationsTableField<JSX.Element>;
}
interface CertificationsTableField<T> {
  value: T;
}

interface CertificationsTableDetails
  extends CertificationsTableField<string | number | JSX.Element> {
  type?: "icon" | "text" | "toggle" | "custom" | "type";
  onClick?: () => void;
}

interface CertificationsTableAction
  extends CertificationsTableField<string | number | JSX.Element> {
  type?: "icon" | "text" | "toggle" | "custom";
  onClick?: () => void;
}
