import { MdAdd } from "react-icons/md";

import { IAction } from "./type";

export const Actions = (
  disableEnjoyment?: boolean,
  onRequestEnjoyment?: () => void,
): IAction[] => {
  return [
    {
      id: "enjoyment",
      icon: <MdAdd />,
      appearance: "primary",
      label: "Agregar solicitud",
      onClick: onRequestEnjoyment,
      isDisabled: disableEnjoyment ?? false,
    },
  ];
};
