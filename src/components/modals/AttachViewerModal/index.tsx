import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import {
  Icon,
  Stack,
  Text,
  useMediaQuery,
  Blanket,
  Divider,
  Button,
} from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { spacing } from "@design/tokens/spacing";
import { ellipsisText } from "@utils/texts";

import {
  StyledModal,
  StyledContainerClose,
  StyledIframe,
  StyledPDFContainer,
} from "./styles";

export interface AttachViewerModalProps {
  title?: string;
  portalId?: string;
  fileUrl: string;
  onCloseModal?: () => void;
}

export function AttachViewerModal(props: AttachViewerModalProps) {
  const {
    title = "Visualizar documento",
    portalId = "portal",
    fileUrl,
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
            {ellipsisText(title, 60)}
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
        <StyledPDFContainer>
          <StyledIframe src={fileUrl} title={title} />
        </StyledPDFContainer>
        <Stack justifyContent="end">
          <Button
            onClick={onCloseModal}
            cursorHover
            appearance="gray"
            variant="outlined"
          >
            {labels.modals.close}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
