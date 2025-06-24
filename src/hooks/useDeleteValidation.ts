import { useState } from "react";

import { ERequestType } from "@ptypes/humanResourcesRequest.types";
import { validateBeforeDelete } from "@validations/vacationDeletion/vacationDeletion";

interface ValidationModal {
  show: boolean;
  title: string;
  message: string;
}

export function useDeleteValidation() {
  const [validationModal, setValidationModal] = useState<ValidationModal>({
    show: false,
    title: "",
    message: "",
  });

  const showValidationError = (title: string, message: string) => {
    setValidationModal({
      show: true,
      title,
      message,
    });
  };

  const closeValidationModal = () => {
    setValidationModal({
      show: false,
      title: "",
      message: "",
    });
  };

  const validateDelete = (requestData?: {
    requestType: ERequestType;
    disbursementDate?: string | null;
    startDateEnment?: string | null;
  }) => {
    if (requestData) {
      const validation = validateBeforeDelete(
        requestData.requestType,
        requestData.disbursementDate,
        requestData.startDateEnment,
      );

      if (!validation.canDelete && validation.message) {
        showValidationError(validation.title, validation.message);
        return false;
      }
    }
    return true;
  };

  return {
    validateDelete,
    validationModal,
    closeValidationModal,
  };
}
