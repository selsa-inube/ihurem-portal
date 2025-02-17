import { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { Icon, Stack } from "@inubekit/inubekit";

import { ActionModal } from "../Actions";

interface DetailProps {
  onClickDetails?: () => void;
  onClickEdit?: () => void;
  onClickEliminate?: () => void;
}

export function Detail(props: DetailProps) {
  const { onClickDetails, onClickEdit, onClickEliminate } = props;
  const [ModalOpen, setModalOpen] = useState(false);
  return (
    <Stack justifyContent="center">
      <Icon
        icon={<MdOutlineMoreVert />}
        size="16px"
        cursorHover
        appearance="primary"
        onClick={() => setModalOpen(true)}
        shape="circle"
        variant="filled"
      />
      {ModalOpen && (
        <ActionModal
          onClose={() => setModalOpen(false)}
          onClickDetails={onClickDetails}
          onClickEdit={onClickEdit}
          onClickEliminate={onClickEliminate}
        />
      )}
    </Stack>
  );
}
