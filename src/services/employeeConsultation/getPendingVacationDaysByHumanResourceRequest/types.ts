export interface IPendingVacationDaysApi {
  daysRequested: number;
  employeeId: string;
  employeeName: string;
  employeeSurname: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestType: string;
  identificationDocumentNumber: string;
  identificationType: string;
  leadEmployeeId: string;
  leadEmployeeIdentificationDocumentNumber: string;
  leadEmployeeIdentificationType: string;
  leadEmployeeName: string;
  leadEmployeeSurname: string;
  periodFrom: string;
  periodTo: string;
  taskManagingId: string;
  taskCode: string;
  taskName: string;
}

export interface IPendingVacationDays {
  daysRequested: number;
  employeeId: string;
  employeeName: string;
  employeeSurname: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestType: string;
  identificationDocumentNumber: string;
  identificationType: string;
  leadEmployeeId: string;
  leadEmployeeIdentificationDocumentNumber: string;
  leadEmployeeIdentificationType: string;
  leadEmployeeName: string;
  leadEmployeeSurname: string;
  periodFrom: string;
  periodTo: string;
  taskManagingId: string;
  taskCode: string;
  taskName: string;
}
