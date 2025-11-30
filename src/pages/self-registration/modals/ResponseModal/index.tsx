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
    ? "Este proceso será gestionado por uno de nuestros funcionarios, puede tardar algún tiempo mientras se gestiona la aprobación."
    : `El documento de identidad suministrado, no cumple los requisitos para acceder al portal. Consulte con nuestro equipo de gestión humana.`;

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack justifyContent="flex-end">
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
        <Stack direction="column" alignItems="center" gap={spacing.s200}>
          <Icon
            icon={isRequestSent ? <MdCheckCircle /> : <IoMdCloseCircle />}
            size="68px"
            appearance={isRequestSent ? "success" : "danger"}
          />
          <Text weight="bold">
            <b>
              {isRequestSent
                ? "¡Solicitud enviada exitosamente!"
                : "Lo sentimos"}
            </b>
          </Text>
          <Text appearance="gray">
            {!isRequestSent ? message : (description ?? message)}
          </Text>
        </Stack>
        <Stack justifyContent="end">
          <Button onClick={onCloseModal}>Entendido</Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
