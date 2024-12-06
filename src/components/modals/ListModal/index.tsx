import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";

import { spacing } from "@design/tokens/spacing/spacing";

import {
  StyledContainerClose,
  StyledContainerContent,
  StyledModal,
  StyledContainerTitle,
} from "./styles";

export interface IOptionButtons {
  label: string;
  variant: "filled" | "outlined" | "none";
  icon?: React.ReactNode;
  fullwidth?: boolean;
  onClick?: () => void;
}

export interface IListModalProps {
  title: string;
  handleClose: () => void;
  onSubmit?: () => void;
  buttonLabel: string;
  portalId?: string;
  content?: JSX.Element | JSX.Element[] | string;
  optionButtons?: IOptionButtons;
}

export const ListModal = (props: IListModalProps) => {
  const {
    title,
    portalId,
    content,
    optionButtons,
    handleClose,
    onSubmit,
    buttonLabel,
  } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <StyledContainerTitle>
          <Text type="headline" size="small">
            {title}
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </StyledContainerTitle>
        <Divider />
        <StyledContainerContent $smallScreen={isMobile}>
          {typeof content === "string" ? (
            <Stack>
              <Text>{content}</Text>
              <Text>{content}</Text>
            </Stack>
          ) : (
            <StyledContainerContent $smallScreen={isMobile}>
              {content}
            </StyledContainerContent>
          )}
        </StyledContainerContent>
        {optionButtons && (
          <Button
            children="Button"
            appearance="primary"
            path="/privilege"
            type="button"
            spacing="wide"
            variant="filled"
            fullwidth={false}
            onClick={() => console.log("clicked from Default-story")}
          />
        )}
        <Stack justifyContent="flex-end" margin="s200 s0">
          <Button onClick={onSubmit ?? handleClose}>{buttonLabel}</Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
};
