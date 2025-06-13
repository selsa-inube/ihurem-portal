import { useState } from "react";

import { IRequestBody } from "@services/humanResourcesRequest/postHumanResourceRequest/types";
import { postHumanResourceRequest } from "@services/humanResourcesRequest/postHumanResourceRequest";
import { useHeaders } from "@hooks/useHeaders";
import { useContractValidation } from "@hooks/useContractValidation";

export function useRequestSubmissionAPI() {
  const [showErrorFlag, setShowErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [humanResourceRequestId, setHumanResourceRequestId] = useState<
    string | null
  >(null);
  const { getHeaders } = useHeaders();

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
    } catch (error) {
      console.error("Error sending request:", error);
      setErrorMessage(
        "Error al enviar la solicitud de vacaciones o certificación. Intente nuevamente.",
      );
      setShowErrorFlag(true);
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
