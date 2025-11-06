import { MdAdd } from "react-icons/md";

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
      label: "Reportar ausencia",
      onClick: onRequestAbsence,
      isDisabled: disableAbsence ?? false,
    },
  ];
};
