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
  absenceDays: number;
  absenceId: string;
  absenceReason: string;
  absenceReasonDetails: string;
  absenceStartDate: string;
  absenceStartHour: number;
  contractId: string;
  employeeId: string;
  hoursAbsent: number;
  subReason: string;
}
