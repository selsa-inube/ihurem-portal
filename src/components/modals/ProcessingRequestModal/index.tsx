import {
  Text,
  Stack,
  Divider,
  Button,
  Blanket,
  useMediaQuery,
} from "@inubekit/inubekit";
import { createPortal } from "react-dom";

import { labels } from "@i18n/labels";
import { AssistedProcess } from "@components/feedback/AssistedProcess";

import { StyledModal, StyledContainer } from "./styles";
import { IStep } from "@components/feedback/AssistedProcess/types";

export interface ProcessingRequestModalProps {
  buttonText?: string;
  description?: string;
  titleDescription?: string;
  title?: string;
  portalId?: string;
  currentStepId?: number;
  steps: IStep[];
  onCloseModal?: () => void;
}

export function ProcessingRequestModal(props: ProcessingRequestModalProps) {
  const {
    buttonText = labels.modals.processingRequest.buttonText,
    description = labels.modals.processingRequest.description,
    title = labels.modals.processingRequest.title,
    portalId = "portal",
    currentStepId = 1,
    steps,
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const portalNode = document.getElementById(portalId);

  if (!portalNode) {
    throw new Error(labels.modals.requestDetail.errorPortalNode);
  }

  const lastStepId = steps[steps.length - 1]?.id;

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="title" weight="bold" size="medium">
            {title}
          </Text>
        </Stack>
        <Divider />
        <Text size="medium" appearance="gray">
          {description}
        </Text>
        <StyledContainer $isMobile={isMobile}>
          <AssistedProcess
            steps={steps}
            currentStepId={currentStepId}
            variant="success"
          />
        </StyledContainer>

        {currentStepId === lastStepId && (
          <Stack justifyContent="end">
            <Button onClick={onCloseModal} appearance="success" cursorHover>
              {buttonText}
            </Button>
          </Stack>
        )}
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
