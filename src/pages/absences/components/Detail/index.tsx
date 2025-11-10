import { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { Stack, Icon } from "@inubekit/inubekit";

import { AbsenceActionModal } from "../Actions";
import { StyledDetail } from "./styles";

interface AbsenceDetailProps {
  disableAbsence?: boolean;
  actionDescriptions?: Record<string, string>;
  hasTableData?: boolean;
  onRequestAbsence?: () => void;
  onInfoIconClick?: (description: string) => void;
}

export function AbsenceDetail(props: AbsenceDetailProps) {
  const {
    disableAbsence,
    actionDescriptions,
    hasTableData,
    onRequestAbsence,
    onInfoIconClick,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <StyledDetail $hasTableData={hasTableData}>
      <Stack justifyContent="flex-end">
        <Icon
          icon={<MdOutlineMoreVert />}
          appearance="dark"
          size="24px"
          onClick={() => setModalOpen(!modalOpen)}
          cursorHover
        />
        {modalOpen && (
          <AbsenceActionModal
            disableAbsence={disableAbsence}
            actionDescriptions={actionDescriptions}
            onRequestAbsence={onRequestAbsence}
            onClose={() => setModalOpen(false)}
            onInfoIconClick={onInfoIconClick}
          />
        )}
      </Stack>
    </StyledDetail>
  );
}
