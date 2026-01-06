import {
  Icon,
  Text,
  Stack,
  Divider,
  Button,
  Blanket,
  useMediaQuery,
} from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdClear, MdCheckCircle } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

import { spacing } from "@design/tokens/spacing";

import { StyledModal, StyledContainerClose } from "./styles";

export interface ResponseSuccesModalProps {
  isRequestSent?: boolean;
  portalId?: string;
  title: string;
  description: string;
  onCloseModal?: () => void;
}

export function ResponseSuccesModal(props: ResponseSuccesModalProps) {
  const {
    isRequestSent = true,
    title,
    description,
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
        <Stack justifyContent="space-between" alignItems="center">
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
        <Stack direction="column" alignItems="center" gap={spacing.s200}>
          <Icon
            icon={isRequestSent ? <MdCheckCircle /> : <IoMdCloseCircle />}
            size="68px"
            appearance={isRequestSent ? "success" : "danger"}
          />
          <Text weight="bold">{description}</Text>
        </Stack>
        <Stack justifyContent="end">
          <Button onClick={onCloseModal}>Entendido</Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
