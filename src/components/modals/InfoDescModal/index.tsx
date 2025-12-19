import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import {
  Icon,
  Text,
  Stack,
  Divider,
  Button,
  Blanket,
  useMediaQuery,
} from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { spacing } from "@design/tokens/spacing";

import { StyledModal, StyledContainerClose } from "./styles";

export interface InfoDescModalProps {
  buttonText?: string;
  description?: string;
  children: React.ReactNode;
  title?: string;
  portalId?: string;
  onCloseModal?: () => void;
}

export function InfoDescModal(props: InfoDescModalProps) {
  const {
    buttonText = labels.modals.infoDescModal.buttonText,
    description = labels.modals.infoDescModal.defaultDescription,
    children,
    title = labels.modals.infoDescModal.title,
    portalId = "portal",
    onCloseModal,
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
              {labels.modals.infoDescModal.close}
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
        {children}
        <Divider dashed />
        <Text size="medium">{description}</Text>
        <Stack justifyContent="end">
          <Button onClick={onCloseModal} cursorHover>
            {buttonText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
