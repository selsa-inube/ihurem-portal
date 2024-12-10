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

import { ModalContent } from "./types";

export interface RequestComponentDetailProps {
  title: string;
  buttonLabel: string;
  modalContent: string | ModalContent[];
  portalId?: string;
  handleClose: () => void;
  filterCriteria?: (item: ModalContent) => boolean;
}

import {
  StyledContainerClose,
  StyledContainerContent,
  StyledModal,
  StyledContainerTitle,
} from "./styles";

function RequestComponentDetail({
  title,
  buttonLabel,
  modalContent,
  portalId = "portal",
  handleClose,
  filterCriteria,
}: RequestComponentDetailProps) {
  const node = document.getElementById(portalId);
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly.",
    );
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  const filteredContent = Array.isArray(modalContent)
    ? modalContent.filter((item) => {
        if (filterCriteria) {
          return filterCriteria(item);
        }
        return true;
      })
    : modalContent;

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
        <StyledContainerContent>
          <Stack gap={spacing.s250} direction="column">
            {Array.isArray(filteredContent) ? (
              filteredContent.map((item, index) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  key={index}
                >
                  <Text type="label" size="medium" weight="bold">
                    {item.label}:
                  </Text>
                  <Text type="body" size="medium" appearance="gray">
                    {item.value}
                  </Text>
                </Stack>
              ))
            ) : (
              <Text type="body" size="medium" appearance="gray">
                {filteredContent}
              </Text>
            )}
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
}

export default RequestComponentDetail;
