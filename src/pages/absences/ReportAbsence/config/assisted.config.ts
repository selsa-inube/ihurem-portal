import { IAssistedStep } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";

export const reportAbsenceSteps: IAssistedStep[] = [
  {
    id: 1,
    number: 1,
    name: labels.absences.steps.requirementsNotMet.name,
    description: labels.absences.steps.requirementsNotMet.description,
  },
  {
    id: 2,
    number: 2,
    name: labels.absences.steps.motive.name,
    description: labels.absences.steps.motive.description,
  },
  {
    id: 3,
    number: 3,
    name: labels.absences.steps.duration.name,
    description: labels.absences.steps.duration.description,
  },
  {
    id: 4,
    number: 4,
    name: labels.absences.steps.documents.name,
    description: labels.absences.steps.documents.description,
  },
  {
    id: 5,
    number: 5,
    name: labels.absences.steps.verification.name,
    description: labels.absences.steps.verification.description,
  },
];
