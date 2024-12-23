import { Icon } from "@inubekit/icon";
import { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { ActionModal } from "../Actions";
import { Stack } from "@inubekit/stack";

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
