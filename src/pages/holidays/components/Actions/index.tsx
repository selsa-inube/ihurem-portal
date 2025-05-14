import { Stack, Text, Icon } from "@inubekit/inubekit";
import { MdOutlineInfo, MdClose } from "react-icons/md";

import {
  StyledContainer,
  StyledLi,
  StyledUl,
  StyledActions,
  StyledCloseIcon,
} from "./styles";
import { Actions } from "./config";
import { IAction } from "./type";

interface ActionModalProps {
  disableEnjoyment?: boolean;
  disablePayment?: boolean;
  actionDescriptions?: Record<string, string>;
  onRequestEnjoyment?: () => void;
  onRequestPayment?: () => void;
  onClose?: () => void;
  onInfoIconClick?: (description: string) => void;
}

export function ActionModal(props: ActionModalProps) {
  const {
    disableEnjoyment,
    disablePayment,
    actionDescriptions,
    onRequestEnjoyment,
    onRequestPayment,
    onClose,
    onInfoIconClick,
  } = props;

  const actionsList = Actions(
    disableEnjoyment,
    disablePayment,
    onRequestEnjoyment,
    onRequestPayment,
  );

  const modifiedActions = [
    {
      label: "Request enjoyment",
      onClick: onRequestEnjoyment,
      disable: disableEnjoyment,
    },
    {
      label: "Request payment",
      onClick: onRequestPayment,
      disable: disablePayment,
    },
  ];

  modifiedActions.forEach(({ label, onClick, disable }) => {
    const actionIndex = actionsList.findIndex((item) => item.label === label);
    if (actionIndex !== -1) {
      actionsList[actionIndex].onClick = onClick;
      actionsList[actionIndex].isDisabled = disable ?? !onClick;
    }
  });

  const handleItemClick = (item: IAction) => {
    if (item.isDisabled && onInfoIconClick) {
      onInfoIconClick(
        actionDescriptions?.[item.id] ?? "No puedes realizar esta acción",
      );
    } else if (!item.isDisabled && item.onClick) {
      item.onClick();
    }
  };

  return (
    <StyledContainer>
      <StyledActions>
        <Stack>
          <StyledUl>
            {actionsList.map((item, index) => (
              <StyledLi
                key={index}
                onClick={() => handleItemClick(item)}
                $isDisabled={item.isDisabled}
              >
                <Icon
                  icon={item.icon}
                  appearance={item.appearance}
                  disabled={item.isDisabled}
                  size="18px"
                />
                <Text
                  size="medium"
                  appearance={item.isDisabled ? "gray" : "dark"}
                >
                  {item.label}
                </Text>
                {item.isDisabled && onInfoIconClick && (
                  <Icon
                    icon={<MdOutlineInfo />}
                    appearance="primary"
                    size="16px"
                    cursorHover
                  />
                )}
              </StyledLi>
            ))}
          </StyledUl>
          <StyledCloseIcon>
            <Icon
              icon={<MdClose />}
              appearance="dark"
              size="18px"
              onClick={onClose}
              cursorHover
            />
          </StyledCloseIcon>
        </Stack>
      </StyledActions>
    </StyledContainer>
  );
}
