export interface IDocument {
  id: number;
  name: string;
  required: boolean;
  disabled: boolean;
  attachedFiles?: File[];
}

export interface IRequiredDocumentsEntry {
  documents?: IDocument[];
}
