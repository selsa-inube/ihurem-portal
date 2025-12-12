import { labels } from "@i18n/labels";

import { IDocument } from "../RequiredDocumentsTable/types";

const RequiredDocumentsFormRequiredFields = {
  motive: true,
  subMotive: true,
  observations: true,
};

const mockDocuments: IDocument[] = [
  {
    id: 1,
    name: labels.absences.reportAbsence.ui.requirementsForm.documents.doc1,
    required: false,
    disabled: false,
  },
  {
    id: 2,
    name: labels.absences.reportAbsence.ui.requirementsForm.documents.doc2,
    required: true,
    disabled: false,
  },
  {
    id: 3,
    name: labels.absences.reportAbsence.ui.requirementsForm.documents.doc3,
    required: false,
    disabled: false,
  },
];

export { RequiredDocumentsFormRequiredFields, mockDocuments };
