import { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { Stack, Icon } from "@inubekit/inubekit";

import { ActionModal } from "../Actions";
import { StyledDetail } from "./styles";

interface DetailProps {
  disableEnjoyment?: boolean;
  disablePayment?: boolean;
  actionDescriptions?: Record<string, string>;
  onRequestEnjoyment?: () => void;
  onRequestPayment?: () => void;
  onInfoIconClick?: (description: string) => void;
}

export function Detail(props: DetailProps) {
  const {
    disableEnjoyment,
    disablePayment,
    actionDescriptions,
    onRequestEnjoyment,
    onRequestPayment,
    onInfoIconClick,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <StyledDetail>
      <Stack justifyContent="flex-end">
        <Icon
          icon={<MdOutlineMoreVert />}
          appearance="dark"
          size="24px"
          onClick={() => setModalOpen(!modalOpen)}
          cursorHover
        />
        {modalOpen && (
          <ActionModal
            disableEnjoyment={disableEnjoyment}
            disablePayment={disablePayment}
            actionDescriptions={actionDescriptions}
            onRequestEnjoyment={onRequestEnjoyment}
            onRequestPayment={onRequestPayment}
            onClose={() => setModalOpen(false)}
            onInfoIconClick={onInfoIconClick}
          />
        )}
      </Stack>
    </StyledDetail>
  );
}
