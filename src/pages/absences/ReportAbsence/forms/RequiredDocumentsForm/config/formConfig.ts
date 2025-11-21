import { IDocument } from "../RequiredDocumentsTable/types";

const RequiredDocumentsFormRequiredFields = {
  motive: true,
  subMotive: true,
  observations: true,
};

const mockDocuments: IDocument[] = [
  {
    id: 1,
    name: "Cita médica programada",
    required: false,
    disabled: false,
  },
  {
    id: 2,
    name: "Incapacidad médica emitida por una EPS o prepagada",
    required: true,
    disabled: false,
  },
  {
    id: 3,
    name: "Orden médica de tratamiento, examen especializado o recuperación post-operatoria",
    required: false,
    disabled: false,
  },
];

export { RequiredDocumentsFormRequiredFields, mockDocuments };
