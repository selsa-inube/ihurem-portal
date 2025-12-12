import { createPortal } from "react-dom";
import { MdClear, MdCheckCircle } from "react-icons/md";
import {
  Icon,
  Text,
  Stack,
  Divider,
  Button,
  Blanket,
  useMediaQuery,
  ISpinnerAppearance,
} from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { spacing } from "@design/tokens/spacing";

import { StyledModal, StyledContainerClose } from "./styles";

export interface RequestInfoModalProps {
  requestId: string;
  staffName?: string;
  buttonText?: string;
  title?: string;
  portalId?: string;
  iconAppearance?: ISpinnerAppearance;
  onCloseModal?: () => void;
  onSubmitButtonClick?: () => void;
}

export function RequestInfoModal(props: RequestInfoModalProps) {
  const {
    requestId,
    staffName,
    buttonText = labels.modals.requestInfoModal.buttonText,
    title = labels.modals.requestInfoModal.title,
    portalId = "portal",
    iconAppearance = "primary",
    onCloseModal,
    onSubmitButtonClick,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const portalNode = document.getElementById(portalId);

  if (!portalNode) {
    throw new Error(
      "The portal node is not defined. Ensure the specific node exists in the DOM.",
    );
  }

  const message = staffName
    ? labels.modals.requestInfoModal.messageWithStaff.replace(
        "{staffName}",
        staffName,
      )
    : labels.modals.requestInfoModal.defaultMessage;

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {title}
          </Text>

          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>{labels.modals.close}</Text>
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

        <Stack direction="column" alignItems="center" gap={spacing.s300}>
          <Icon
            icon={<MdCheckCircle />}
            size="68px"
            appearance={iconAppearance}
          />

          <Text>
            {labels.modals.requestInfoModal.title} <b>{requestId}</b>
          </Text>

          <Text size="medium">{message}</Text>
        </Stack>

        <Stack justifyContent="end">
          <Button onClick={onSubmitButtonClick} fullwidth={isMobile}>
            {buttonText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
