import { IAbsenceMotiveEntry } from "./forms/AbsenceMotiveForm/types";
import { IAbsenceDurationEntry } from "./forms/AbsenceDurationForm/types";
import { IRequiredDocumentsEntry } from "./forms/RequiredDocumentsForm/types";

export interface IFormsUpdateData {
  absenceMotiveInformation: { isValid: boolean; values: IAbsenceMotiveEntry };
  absenceDurationInformation: {
    isValid: boolean;
    values: IAbsenceDurationEntry;
  };
  requiredDocumentsInformation: {
    isValid: boolean;
    values: IRequiredDocumentsEntry;
  };
}

export interface ModalState {
  isSendModalVisible: boolean;
  isRequestInfoModalVisible: boolean;
}
