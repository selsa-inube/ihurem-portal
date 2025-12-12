import { labels } from "@i18n/labels";

const t = labels.absences.reportAbsence.ui.requirementsForm;

export const mockRequestDetail = [
  {
    label: labels.absences.reportAbsence.form.motiveLabel,
    value: "Ausencia médica",
  },
  {
    label: labels.absences.reportAbsence.form.detailsLabel,
    value:
      "El empleado se tuvo que ausentar debido a una diligencia personal relacionada con el pago de un servicio urgente que requirió su asistencia personal.",
  },
];

export const mockDocuments = [
  {
    id: 1,
    name: `${t.documents.doc1} ${t.table.optionalSuffix}`,
  },
  {
    id: 2,
    name: `${t.documents.doc2} ${t.table.requiredSuffix}`,
  },
  {
    id: 3,
    name: `${t.documents.doc3} ${t.table.optionalSuffix}`,
  },
];
