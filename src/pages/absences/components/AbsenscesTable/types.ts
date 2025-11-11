export interface IAbsencesTable {
  reason: AbsencesTableField<string>;
  date: AbsencesTableField<string>;
  duration: AbsencesTableField<string>;
  view: AbsencesTableAction;
  download: AbsencesTableAction;
  dataDetails?: AbsencesTableField<object>;
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

export interface AbsencesTableDataDetails {
  absenceType: string;
  employeeName: string;
  department: string;
  startDate: string;
  endDate: string;
  reasonDescription: string;
  approvedBy: string;
  observationEmployee: string;
}
