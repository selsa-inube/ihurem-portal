export interface ICertificationsTable {
  requestId?: string;
  requestNumber: CertificationsTableField<string>;
  date: CertificationsTableField<string>;
  status: CertificationsTableField<string>;
  dataDetails: CertificationsTableField<object>;
  details: CertificationsTableDetails;
  delete: CertificationsTableAction;
  type: CertificationsTableField<string>;
  mobileActions?: CertificationsTableField<JSX.Element>;
}

export interface CertificationsTableField<T> {
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

export interface CertificationsTableDataDetails {
  certificationType: string;
  contractId: string;
  addressee: string;
  description: string;
  businessName: string;
  contractType: string;
  observationEmployee: string;
}
