import { MdAdd } from "react-icons/md";

import { labels } from "@i18n/labels";

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
      label: labels.holidays.actions.enjoymentRequest,
      onClick: onRequestEnjoyment,
      isDisabled: disableEnjoyment ?? false,
    },
    {
      id: "payment",
      icon: <MdAdd />,
      appearance: "primary",
      label: labels.holidays.actions.paymentRequest,
      onClick: onRequestPayment,
      isDisabled: disablePayment ?? false,
    },
  ];
};
