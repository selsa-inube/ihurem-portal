import { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { Stack, Icon } from "@inubekit/inubekit";

import { ActionModal } from "../Actions";
import { StyledDetail } from "./styles";

interface DetailProps {
  disableEnjoyment?: boolean;
  disablePayment?: boolean;
  actionDescriptions?: Record<string, string>;
  showTabs?: boolean;
  isUsedDaysTab?: boolean;
  onRequestEnjoyment?: () => void;
  onRequestPayment?: () => void;
  onInfoIconClick?: (description: string) => void;
}

export function Detail(props: DetailProps) {
  const {
    disableEnjoyment,
    disablePayment,
    actionDescriptions,
    showTabs = false,
    isUsedDaysTab = false,
    onRequestEnjoyment,
    onRequestPayment,
    onInfoIconClick,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <StyledDetail $showTabs={showTabs} $isUsedDaysTab={isUsedDaysTab}>
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
