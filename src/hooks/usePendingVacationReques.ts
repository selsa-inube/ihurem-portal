import { useEffect, useState } from "react";

import { getPendingVacationRequestsByEmployee } from "@services/humanResourcesRequest/getPendingVacationRequestsByEmployee";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useHeaders } from "@hooks/useHeaders";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { Logger } from "@utils/logger";

const ERROR_CODE_GET_PENDING_VACATIONS_FAILED = 1013;

export const usePendingVacationRequests = <T>(
  formatData: (data: HumanResourceRequest[]) => T[],
  employeeId?: string,
) => {
  const [data, setData] = useState<T[]>([]);
  const [rawData, setRawData] = useState<HumanResourceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { getHeaders } = useHeaders();
  const { employees } = useAppContext();
  const { showErrorModal } = useErrorModal();

  const effectiveEmployeeId = employeeId ?? employees?.employeeId;

  const fetchData = async () => {
    if (!effectiveEmployeeId) return;
    setIsLoading(true);

    try {
      const headers = await getHeaders();

      const requests = await getPendingVacationRequestsByEmployee(
        effectiveEmployeeId,
        headers,
      );

      setRawData(requests);
      setData(formatData(requests));
      setError(null);
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      setRawData([]);
      setData([]);

      Logger.error("Error al obtener vacaciones en trámite", errorObj, {
        effectiveEmployeeId,
      });

      const errorConfig =
        modalErrorConfig[ERROR_CODE_GET_PENDING_VACATIONS_FAILED];

      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${errorObj.message}`,
        solutionText: errorConfig.solutionText,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [effectiveEmployeeId]);

  return { data, rawData, isLoading, error, refetch: fetchData };
};
