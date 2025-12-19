import { IAssistedStep, IOption } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";

export const newCCertificationApplication: IAssistedStep[] = [
  {
    id: 1,
    number: 1,
    name: labels.certifications.assisted.steps.step1Name,
    description: labels.certifications.assisted.steps.step1Description,
  },
  {
    id: 2,
    number: 2,
    name: labels.certifications.assisted.steps.step2Name,
    description: labels.certifications.assisted.steps.step2Description,
  },
  {
    id: 3,
    number: 3,
    name: labels.certifications.assisted.steps.step3Name,
    description: labels.certifications.assisted.steps.step3Description,
  },
];

export const certificationOptions: IOption[] = [
  {
    id: "1",
    label: labels.certifications.options.certificates.server,
    value: "certificado de servidor",
  },
  {
    id: "2",
    label: labels.certifications.options.certificates.belonging,
    value: "certificado de pertenencia a empresa",
  },
  {
    id: "3",
    label: labels.certifications.options.certificates.representative,
    value: "certificado de representante",
  },
];

export const contractOptions: IOption[] = [
  {
    id: "1",
    label: labels.certifications.options.contracts.obra,
    value: "contrato por obra o labor.",
  },
  {
    id: "2",
    label: labels.certifications.options.contracts.fijo,
    value: "contrato de trabajo a término fijo.",
  },
  {
    id: "3",
    label: labels.certifications.options.contracts.indefinido,
    value: "contrato de trabajo a término indefinido.",
  },
];
