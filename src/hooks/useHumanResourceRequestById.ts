import { useEffect, useState } from "react";

import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { getHumanResourceRequestById } from "@services/humanResourcesRequest/getHumanResourceRequestById";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { useHeaders } from "@hooks/useHeaders";

const ERROR_CODE_GENERIC = 1004;

export const useHumanResourceRequestById = (
  humanResourceRequestId: string,
  pollingTick?: number,
) => {
  const [humanResourceRequest, setHumanResourceRequest] =
    useState<HumanResourceRequest>({} as HumanResourceRequest);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [codeError, setCodeError] = useState<number | null>(null);

  const { showErrorModal } = useErrorModal();
  const { getHeaders } = useHeaders();

  useEffect(() => {
    if (!humanResourceRequestId) return;

    const fetchHumanResourceRequest = async () => {
      setLoading(true);

      try {
        const headers = await getHeaders(true);

        const result = await getHumanResourceRequestById(
          humanResourceRequestId,
          headers,
        );

        if (!result || !Object.keys(result).length) {
          setError(true);
          setCodeError(ERROR_CODE_GENERIC);
          return;
        }

        setHumanResourceRequest(result);
        setError(false);
        setCodeError(null);
      } catch (err) {
        setError(true);
        setHumanResourceRequest({} as HumanResourceRequest);
        setCodeError(ERROR_CODE_GENERIC);

        const errorConfig = modalErrorConfig[ERROR_CODE_GENERIC];

        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHumanResourceRequest();
  }, [humanResourceRequestId, pollingTick, getHeaders, showErrorModal]);

  return {
    humanResourceRequest,
    loading,
    error,
    codeError,
  };
};
