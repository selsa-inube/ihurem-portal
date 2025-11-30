export interface ISubReason {
  id?: string;
  name?: string;
  description?: string;
  code?: string;
}

export interface IAbsenceReason {
  absenceReason: string;
  subReason: ISubReason[];
}

export interface IGetAbsenceReasonsParams {
  regulatoryFramework: string;
  company: string;
}
