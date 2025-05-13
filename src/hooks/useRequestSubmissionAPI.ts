import { useState } from "react";

import { IRequestBody } from "@services/humanResourcesRequest/postHumanResourceRequest/types";
import { postHumanResourceRequest } from "@services/humanResourcesRequest/postHumanResourceRequest";

export function useRequestSubmissionAPI() {
  const [showErrorFlag, setShowErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [humanResourceRequestId, setHumanResourceRequestId] = useState<
    string | null
  >(null);

  const submitRequestToAPI = async (requestBody: IRequestBody) => {
    try {
      const response = await postHumanResourceRequest(requestBody);

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
