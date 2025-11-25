import { useState } from "react";

import { postSelfRegistration } from "@services/employeePortal/postSelfRegistration";
import { ISelfRegistrationRequestBody } from "@services/employeePortal/postSelfRegistration/types";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_POST_REGISTRATION_REQUESTS_FAILED = 1023;

export function useSelfRegistrationAPI() {
  const [humanResourceRequestId, setHumanResourceRequestId] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();
  const [error, setError] = useState<Error | null>(null);

  const submitSelfRegistration = async (
    requestBody: ISelfRegistrationRequestBody,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const headers = await getHeaders();
      const response = await postSelfRegistration(requestBody, headers);

      if (response?.humanResourceRequestId) {
        setHumanResourceRequestId(response.humanResourceRequestId);
        setIsLoading(false);
        return { success: true, response };
      }

      setIsLoading(false);
      return { success: false };
    } catch (err) {
      console.error("Error sending self-registration:", err);

      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);

      const errorConfig =
        modalErrorConfig[ERROR_CODE_POST_REGISTRATION_REQUESTS_FAILED];
      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
        solutionText: errorConfig.solutionText,
      });

      setIsLoading(false);
      return { success: false };
    }
  };

  return {
    submitSelfRegistration,
    humanResourceRequestId,
    isLoading,
    error,
  };
}
