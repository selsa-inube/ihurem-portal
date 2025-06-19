import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useErrorFlag } from "@hooks/useErrorFlag";
import { useHeaders } from "@hooks/useHeaders";
import { deleteHumanResourceRequest } from "@services/humanResourcesRequest/deleteHumanResourceRequest";
import { validateVacationDeletion } from "@validations/vacationDeletion/vacationDeletion";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";
import { IVacationDeletion } from "@validations/vacationDeletion/types";

import { useContractValidation } from "./useContractValidation";

export function useDeleteRequest<T extends { requestId?: string }>(
  updateStateFunction: (filterFn: (item: T) => boolean) => void,
) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFlag, setShowFlag] = useState(false);
  const [validationModal, setValidationModal] = useState<{
    show: boolean;
    title: string;
    message: string;
  }>({
    show: false,
    title: "",
    message: "",
  });
  const { getHeaders } = useHeaders();

  useContractValidation();

  useErrorFlag(
    showFlag,
    "La solicitud se canceló correctamente",
    "Solicitud Descartada",
    true,
  );

  const validateBeforeDelete = (
    requestType: ERequestType,
    disbursementDate: string | null | undefined,
    startDateEnment: string | null | undefined,
  ): IVacationDeletion => {
    return validateVacationDeletion(
      requestType,
      disbursementDate,
      startDateEnment,
    );
  };

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

  const handleDelete = async (
    id: string,
    justification: string,
    number: string,
    requestData?: {
      requestType: ERequestType;
      disbursementDate?: string | null;
      startDateEnment?: string | null;
    },
    idField: keyof T = "requestId",
  ) => {
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

    setIsDeleting(true);
    try {
      const headers = await getHeaders();
      await deleteHumanResourceRequest(id, justification, number, headers);
      updateStateFunction((item: T) => item[idField] !== id);
      setShowFlag(false);
      return true;
    } catch {
      navigate(location.pathname, {
        state: {
          showFlag: true,
          flagTitle: "Error",
          flagMessage: "No se pudo eliminar la solicitud",
          isSuccess: false,
        },
        replace: true,
      });
      return false;
    } finally {
      setIsDeleting(false);
      setShowFlag(true);
    }
  };

  return {
    isDeleting,
    handleDelete,
    validationModal,
    closeValidationModal,
  };
}
