import { MdClose } from "react-icons/md";
import { Stack, Text, Icon } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

import { StyledMenu, StyledContainerLabel, StyledCloseIcon } from "./styles";
import { IOptions } from "./types";

interface MenuPropectProps {
  options: IOptions[];
  onMouseLeave: () => void;
  onClose: () => void;
}

export const MenuPropect = (props: MenuPropectProps) => {
  const { options, onMouseLeave, onClose } = props;

  return (
    <StyledMenu onMouseLeave={onMouseLeave}>
      <Stack direction="column">
        <Stack justifyContent="end" padding={`${spacing.s0} ${spacing.s150}`}>
          <StyledCloseIcon onClick={onClose}>
            <Icon
              icon={<MdClose />}
              appearance="dark"
              size="24px"
              cursorHover
            />
          </StyledCloseIcon>
        </Stack>

        {options?.map((option, index) =>
          option.visible ? (
            <StyledContainerLabel key={index} onClick={option.onClick}>
              <Stack alignItems="center" gap={spacing.s100}>
                <Icon
                  icon={option.icon}
                  appearance={option.appearance ?? "gray"}
                  size="24px"
                />
                <Text size="small" weight="normal">
                  {option.title}
                </Text>
              </Stack>
            </StyledContainerLabel>
          ) : null,
        )}
      </Stack>
    </StyledMenu>
  );
};

export type { MenuPropectProps };
