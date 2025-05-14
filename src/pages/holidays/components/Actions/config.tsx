import { MdAdd } from "react-icons/md";

import { IAction } from "./type";

export const Actions = (
  disableEnjoyment?: boolean,
  disablePayment?: boolean,
  onRequestEnjoyment?: () => void,
  onRequestPayment?: () => void,
): IAction[] => {
  return [
    {
      id: "enjoyment",
      icon: <MdAdd />,
      appearance: "primary",
      label: "Solicitar disfrute",
      onClick: onRequestEnjoyment,
      isDisabled: disableEnjoyment ?? false,
    },
    {
      id: "payment",
      icon: <MdAdd />,
      appearance: "primary",
      label: "Solicitar pago",
      onClick: onRequestPayment,
      isDisabled: disablePayment ?? false,
    },
  ];
};
