import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { MdClose } from "react-icons/md";
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
        <Stack justifyContent="end" padding=" 0px 10px">
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
              <Stack alignItems="center" gap="8px">
                <Icon
                  icon={option.icon}
                  appearance={index === 0 ? "gray" : "danger"}
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
