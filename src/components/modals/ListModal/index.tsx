import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";

import { spacing } from "@design/tokens/spacing/spacing";

import {
  StyledContainerClose,
  StyledContainerContent,
  StyledModal,
  StyledContainerTitle,
} from "./styles";

export interface IListModalProps {
  title: string;
  handleClose: () => void;
  onSubmit?: () => void;
  buttonLabel: string;
  portalId?: string;
  modalContent: { label: string; value: string }[];
}

export const ListModal = (props: IListModalProps) => {
  const { title, portalId, handleClose, onSubmit, buttonLabel } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <StyledContainerTitle>
          <Text type="headline" size="small">
            {title}
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
        <StyledContainerContent $smallScreen={isMobile}>
          <Stack gap={spacing.s250} direction="column">
            <Stack direction="row" justifyContent="space-between">
              <Text type="label" size="medium" weight="bold">
                Número:
              </Text>
              <Text type="body" size="medium" appearance="gray">
                1234
              </Text>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Text type="label" size="medium" weight="bold">
                Tipo:
              </Text>
              <Text type="body" size="medium" appearance="gray">
                Disfrute de vacaciones
              </Text>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Text type="label" size="medium" weight="bold">
                Fecha:
              </Text>
              <Text type="body" size="medium" appearance="gray">
                22/Oct/2024
              </Text>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Text type="label" size="medium" weight="bold">
                Estado:
              </Text>
              <Text type="body" size="medium" appearance="gray">
                En trámite de aprobación
              </Text>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Text type="label" size="medium" weight="bold">
                Días de disfrute:
              </Text>
              <Text type="body" size="medium" appearance="gray">
                2
              </Text>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Text type="label" size="medium" weight="bold">
                Destinatario:
              </Text>
              <Text type="body" size="medium" appearance="gray">
                A quien interese
              </Text>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Text type="label" size="medium" weight="bold">
                Contrato:
              </Text>
              <Text type="body" size="medium" appearance="gray">
                Indefinido - 02/sep/2024
              </Text>
            </Stack>
          </Stack>
        </StyledContainerContent>

        <Stack justifyContent="flex-end" gap={spacing.s100}>
          <Button onClick={handleClose} fullwidth={isMobile}>
            {buttonLabel}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
};
