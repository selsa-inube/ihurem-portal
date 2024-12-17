import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";

export interface IFormsUpdateData {
  personalInformation: { isValid: boolean; values: IGeneralInformationEntry };
}
