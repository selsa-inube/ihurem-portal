import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { useMediaQuery } from "@inubekit/hooks";
import { Blanket } from "@inubekit/blanket";
import { Divider } from "@inubekit/divider";

import { spacing } from "@design/tokens/spacing/spacing";

import { StyledModal, StyledContainerClose } from "./styles";

export interface SendRequestModalProps {
  descriptionText: string;
  buttonText?: string;
  title?: string;
  portalId?: string;
  secondaryButtonText?: string;
  onCloseModal?: () => void;
  onSubmitButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}

export function SendRequestModal(props: SendRequestModalProps) {
  const {
    descriptionText,
    buttonText = "Enviar",
    title = "Enviar solicitud",
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
        </Stack>
        <Divider />
        <Text>{descriptionText}</Text>
        <Stack justifyContent="end" gap={spacing.s250}>
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
