import CheckIcon from "@assets/images/CheckIcon.svg";
import CloseIcon from "@assets/images/CloseIcon.svg";
import HelpIcon from "@assets/images/HelpIcon.svg";
import { labels } from "@i18n/labels";

import { IAction } from "./type";

export const Actions = (
  onClickCheck?: () => void,
  onClickClose?: () => void,
  onClickHelp?: () => void,
): IAction[] => {
  return [
    {
      icon: (
        <img
          src={CheckIcon}
          alt="Si cumple"
          style={{ width: 16, height: 16 }}
        />
      ),
      appearance: "success",
      label: labels.modals.statusLabels.success,
      onClick: onClickCheck,
    },
    {
      icon: (
        <img
          src={CloseIcon}
          alt="No cumple"
          style={{ width: 16, height: 16 }}
        />
      ),
      appearance: "danger",
      label: labels.modals.statusLabels.danger,
      onClick: onClickClose,
    },
    {
      icon: (
        <img
          src={HelpIcon}
          alt="Sin evaluar"
          style={{ width: 16, height: 16 }}
        />
      ),
      appearance: "warning",
      label: labels.modals.statusLabels.warning,
      onClick: onClickHelp,
    },
  ];
};
