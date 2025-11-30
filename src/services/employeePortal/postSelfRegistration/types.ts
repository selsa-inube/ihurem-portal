export interface ISelfRegistrationRequestBody {
  identificationDocumentNumber: string;
  identificationType: string;
}

export interface ISelfRegistrationResponse {
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  positive: string;
  responseType: string;
}
