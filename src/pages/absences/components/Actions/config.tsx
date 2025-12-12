import { MdAdd } from "react-icons/md";

import { labels } from "@i18n/labels";

import { IAction } from "./type";

export const Actions = (
  disableAbsence?: boolean,
  onRequestAbsence?: () => void,
): IAction[] => {
  return [
    {
      id: "absence",
      icon: <MdAdd />,
      appearance: "primary",
      label: labels.absences.ui.actions.reportAbsenceButton,
      onClick: onRequestAbsence,
      isDisabled: disableAbsence ?? false,
    },
  ];
};
