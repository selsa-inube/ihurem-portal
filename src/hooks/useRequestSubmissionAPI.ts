import { useState } from "react";

import { Logger } from "@utils/logger";
import { IRequestBody } from "@services/humanResourcesRequest/postHumanResourceRequest/types";
import { postHumanResourceRequest } from "@services/humanResourcesRequest/postHumanResourceRequest";
import { useHeaders } from "@hooks/useHeaders";
import { useContractValidation } from "@hooks/useContractValidation";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_POST_HR_REQUESTS_FAILED = 1023;

export function useRequestSubmissionAPI() {
  const [showErrorFlag, setShowErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [humanResourceRequestId, setHumanResourceRequestId] = useState<
    string | null
  >(null);
  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  useContractValidation();

  const submitRequestToAPI = async (requestBody: IRequestBody) => {
    try {
      const headers = await getHeaders();
      const response = await postHumanResourceRequest(requestBody, headers);

      if (response?.humanResourceRequestId) {
        setHumanResourceRequestId(response.humanResourceRequestId);
        return { success: true, response };
      }

      setErrorMessage("Error al enviar la solicitud. Intente nuevamente.");
      setShowErrorFlag(true);
      return { success: false };
    } catch (err) {
      Logger.error("Error sending request", err as Error, { requestBody });
      setErrorMessage("Error al enviar la solicitud. Intente nuevamente.");
      const errorConfig = modalErrorConfig[ERROR_CODE_POST_HR_REQUESTS_FAILED];
      setShowErrorFlag(true);
      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
        solutionText: errorConfig.solutionText,
      });
      return { success: false };
    }
  };

  return {
    submitRequestToAPI,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
    humanResourceRequestId,
  };
}
