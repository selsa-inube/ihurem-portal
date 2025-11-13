export interface IAbsencesProcedureTable {
  requestId?: string;
  reason: AbsencesTableField<string>;
  date: AbsencesTableField<string>;
  duration: AbsencesTableField<string>;
  view: AbsencesTableAction;
  state: AbsencesTableField<string>;
  download: AbsencesTableAction;
  dataDetails?: AbsencesTableField<Partial<AbsencesProcedureTableDataDetails>>;
  mobileActions?: AbsencesTableField<JSX.Element>;
}

interface AbsencesTableField<T> {
  value: T;
}

interface AbsencesTableAction
  extends AbsencesTableField<string | number | JSX.Element> {
  type?: "icon" | "text" | "toggle" | "custom";
  onClick?: () => void;
}

export interface AbsencesProcedureTableDataDetails {
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestType: string;
  humanResourceRequestDescription: string;
  humanResourceRequestDate: string;
  humanResourceRequestStatus: string;
  employeeId: string;
  staffName: string;
  staffLastName: string;
  positionName: string;
  department?: string;
  identificationDocumentNumber: string;
  taskCode: string;
  taskName: string;
  taskStatus: string;
  taskManagingId: string;
  description: string;
  approvedBy?: string;
  observationEmployee?: string;
}
