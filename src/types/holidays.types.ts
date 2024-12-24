export interface IHolidaysInProcess {
  vacationId: string;
  contractId: string;
  vacationType: string;
  startDateVacationEnjoyment: string;
  nonWorkingDaysOfVacation: number;
  joiningLetter: string;
  earlyReturnDate: string;
  vacationDaysPendingEarlyReturn: string;
  vacationStatus: string;
  vacationPaymentDate: string;
}

export enum HolidaysActionTypes {
  fixed_term_contract = "Termino Fijo",
  permanent_job = "Término Indefinido",
  by_work_or_labor = "Por Obra o labor",
  civil_contract = "Contrato civil por prestacion de servicios",
  apprentice = "Aprendiz",
  contingent_worker = "Contrato ocasional de trabajo",
}
