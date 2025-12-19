import {
  Icon,
  Text,
  Stack,
  Button,
  Blanket,
  Divider,
  useMediaQuery,
} from "@inubekit/inubekit";
import { MdClear, MdInfoOutline } from "react-icons/md";
import { createPortal } from "react-dom";

import { spacing } from "@design/tokens/spacing";

import {
  StyledContainerClose,
  StyledContainerContent,
  StyledModal,
  StyledContainerTitle,
  StyledMessageContainer,
} from "./styles";
import { Document } from "./UploadDocumentsTable/types";
import { UploadDocumentsTable } from "./UploadDocumentsTable";
import { labels } from "@i18n/labels"; // <-- centralizamos los textos

export interface UploadDocumentsModalProps {
  portalId?: string;
  handleClose: () => void;
  documents: Document[];
}

export function UploadDocumentsModal(props: UploadDocumentsModalProps) {
  const { portalId = "portal", handleClose, documents } = props;

  const node = document.getElementById(portalId);
  if (!node) {
    throw new Error(
      "El nodo del portal no está definido. Asegúrate de tener un div con id='portal' en el HTML.",
    );
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <StyledContainerTitle>
          <Text type="headline" size="small">
            {labels.modals.uploadDocumentsTable.modalTitle}
          </Text>
          <StyledContainerClose onClick={handleClose}>
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
        </StyledContainerTitle>

        <Divider />

        <StyledContainerContent>
          {documents.length > 0 ? (
            <UploadDocumentsTable documents={documents} />
          ) : (
            <StyledMessageContainer>
              <Stack gap={spacing.s150}>
                <Icon icon={<MdInfoOutline />} size="20px" appearance="help" />
                <Text type="body" size="medium" weight="bold">
                  {labels.modals.uploadDocumentsTable.emptyMessage}
                </Text>
              </Stack>
            </StyledMessageContainer>
          )}
        </StyledContainerContent>

        <Stack justifyContent="flex-end" gap={spacing.s100}>
          <Button appearance="primary" onClick={handleClose} cursorHover>
            {labels.modals.close}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}
