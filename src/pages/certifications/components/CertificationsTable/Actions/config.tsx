import { MdAdd } from "react-icons/md";

import { IAction } from "./type";
import { labels } from "@i18n/labels";

export const Actions = (
  disableEnjoyment?: boolean,
  onRequestEnjoyment?: () => void,
): IAction[] => {
  return [
    {
      id: "enjoyment",
      icon: <MdAdd />,
      appearance: "primary",
      label: labels.certifications.pages.addRequest,
      onClick: onRequestEnjoyment,
      isDisabled: disableEnjoyment ?? false,
    },
  ];
};
