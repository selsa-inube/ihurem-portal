import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { useMediaQuery } from "@inubekit/hooks";
import { Blanket } from "@inubekit/blanket";
import { Divider } from "@inubekit/divider";

import { StyledModal, StyledContainerClose } from "./styles";

export interface SendRequestProps {
  title: string;
  message?: string;
  buttonText: string;
  portalId?: string;
  secondaryButtonText?: string;
  onCloseModal?: () => void;
  onSubmitButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}

export function SendRequest(props: SendRequestProps) {
  const {
    title,
    message = "¿Realmente deseas continuar?",
    buttonText,
    portalId = "portal",
    secondaryButtonText = "Cancelar",
    onCloseModal,
    onSubmitButtonClick,
    onSecondaryButtonClick,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const portalNode = document.getElementById(portalId);

  if (!portalNode) {
    throw new Error(
      "The portal node is not defined. Ensure the specific node exists in the DOM.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {title}
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap="8px">
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>
        <Divider />
        <Text type="body" size="large">
          {message}
        </Text>
        <Stack justifyContent="end" margin="12px 0" gap="12px">
          <Button
            type="button"
            variant="outlined"
            appearance="gray"
            onClick={onSecondaryButtonClick}
          >
            {secondaryButtonText}
          </Button>
          <Button onClick={onSubmitButtonClick}>{buttonText}</Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
