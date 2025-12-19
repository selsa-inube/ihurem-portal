import { createPortal } from "react-dom";
import { MdClear, MdCheckCircle } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
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

export interface ResponseModalProps {
  isRequestSent?: boolean;
  portalId?: string;
  description?: string;
  onCloseModal?: () => void;
}

export function ResponseModal(props: ResponseModalProps) {
  const {
    isRequestSent = true,
    portalId = "portal",
    onCloseModal,
    description,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const portalNode = document.getElementById(portalId);

  if (!portalNode) {
    throw new Error(
      "The portal node is not defined. Ensure the specific node exists in the DOM.",
    );
  }

  const message = isRequestSent
    ? labels.selfRegistrationLabels.responseModal.successMessage
    : labels.selfRegistrationLabels.responseModal.failureMessage;

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack justifyContent="flex-end">
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>
                {labels.selfRegistrationLabels.responseModal.closeButton}
              </Text>
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
        <Stack direction="column" alignItems="center" gap={spacing.s200}>
          <Icon
            icon={isRequestSent ? <MdCheckCircle /> : <IoMdCloseCircle />}
            size="68px"
            appearance={isRequestSent ? "success" : "danger"}
          />
          <Text weight="bold">
            <b>
              {isRequestSent
                ? labels.selfRegistrationLabels.responseModal.successTitle
                : labels.selfRegistrationLabels.responseModal.failureTitle}
            </b>
          </Text>
          <Text appearance="gray">
            {!isRequestSent ? message : (description ?? message)}
          </Text>
        </Stack>
        <Stack justifyContent="end">
          <Button onClick={onCloseModal}>
            {labels.selfRegistrationLabels.responseModal.confirmButton}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
