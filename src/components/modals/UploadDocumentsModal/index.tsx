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
            Cargar documentos
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

        <StyledContainerContent>
          {documents.length > 0 ? (
            <UploadDocumentsTable documents={documents} />
          ) : (
            <StyledMessageContainer>
              <Stack>
                <Icon icon={<MdInfoOutline />} size="20px" appearance="help" />
                <Text type="body" size="medium" weight="bold">
                  La ausencia no incluyó requisitos.
                </Text>
              </Stack>
            </StyledMessageContainer>
          )}
        </StyledContainerContent>

        <Stack justifyContent="flex-end" gap={spacing.s100}>
          <Button appearance="primary" onClick={handleClose} cursorHover>
            Cerrar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}
