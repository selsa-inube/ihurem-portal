import { IAssistedStep, IOption } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { showRequirements } from "@pages/holidays/config/requirements";

export const requestPaymentSteps: IAssistedStep[] = showRequirements
  ? [
      {
        id: 1,
        number: 1,
        name: labels.holidays.assisted.steps.unmetRequirements.name,
        description:
          labels.holidays.assisted.steps.unmetRequirements.description,
      },
      {
        id: 2,
        number: 2,
        name: labels.holidays.assisted.steps.generalInformation.name,
        description:
          labels.holidays.assisted.steps.generalInformation.description,
      },
      {
        id: 3,
        number: 3,
        name: labels.holidays.assisted.steps.verification.name,
        description: labels.holidays.assisted.steps.verification.description,
      },
    ]
  : [
      {
        id: 1,
        number: 1,
        name: labels.holidays.assisted.steps.generalInformation.name,
        description:
          labels.holidays.assisted.steps.generalInformation.description,
      },
      {
        id: 2,
        number: 2,
        name: labels.holidays.assisted.steps.verification.name,
        description: labels.holidays.assisted.steps.verification.description,
      },
    ];

export const contractOptions: IOption[] = [
  {
    id: "1",
    label: labels.holidays.contractOptions.workContract,
    value: labels.holidays.contractOptions.workContract,
  },
  {
    id: "2",
    label: labels.holidays.contractOptions.fixedContract,
    value: labels.holidays.contractOptions.fixedContract,
  },
  {
    id: "3",
    label: labels.holidays.contractOptions.indefiniteContract,
    value: labels.holidays.contractOptions.indefiniteContract,
  },
];
