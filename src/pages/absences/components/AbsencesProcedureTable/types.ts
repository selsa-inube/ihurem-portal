import {
  EAbsenceReason,
  ERequestType,
  HumanResourceRequestStatus,
  ETaskStatus,
} from "@ptypes/humanResourcesRequest.types";

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
  humanResourceRequestType: ERequestType;
  humanResourceRequestDescription: string;
  humanResourceRequestDate: string;
  humanResourceRequestStatus: HumanResourceRequestStatus;
  humanResourceRequestData?: {
    reason?: EAbsenceReason;
    subReason?: string;
    motifDetail?: string;
    startDate?: string;
    durationOfDays?: number;
  };
  employeeId: string;
  staffName: string;
  staffLastName: string;
  positionName: string;
  identificationDocumentNumber: string;
  taskCode: string;
  taskName: string;
  taskStatus: ETaskStatus;
  taskManagingId: string;
  department?: string;
  approvedBy?: string;
  observationEmployee?: string;
}
