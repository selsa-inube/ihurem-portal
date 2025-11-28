import { useState } from "react";

import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { deleteHumanResourceRequest } from "@services/humanResourcesRequest/deleteHumanResourceRequest";

import { useContractValidation } from "./useContractValidation";

const ERROR_CODE_DELETE_FAILED = 1009;

export function useDeleteRequest() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  useContractValidation();

  const handleDelete = async (
    id: string,
    justification: string,
    number: string,
  ): Promise<boolean> => {
    setIsDeleting(true);

    try {
      const headers = await getHeaders();
      await deleteHumanResourceRequest(id, justification, number, headers);
      return true;
    } catch (error) {
      console.error("Error al eliminar la solicitud:", error);

      const errorConfig = modalErrorConfig[ERROR_CODE_DELETE_FAILED];

      showErrorModal({
        descriptionText: errorConfig.descriptionText,
        solutionText: errorConfig.solutionText,
      });

      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
