import { useState, useEffect } from "react";

import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";
import {
  HumanResourceRequest,
  ERequestType,
  requestTypeMap,
  requestTypeLabels,
} from "@ptypes/humanResourcesRequest.types";
import { useHeaders } from "@hooks/useHeaders";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { Logger } from "@utils/logger";

const ERROR_CODE_GET_HR_REQUESTS_FAILED = 1013;

export const useHumanResourceRequests = <T>(
  formatData: (data: HumanResourceRequest[]) => T[],
  typeRequest?: ERequestType,
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
      const backendType = typeRequest ? requestTypeMap[typeRequest] : undefined;

      const requests = await getHumanResourceRequests(
        effectiveEmployeeId,
        headers,
        backendType,
      );

      const requestsData = requests ?? [];
      setRawData(requestsData);
      setData(formatData(requestsData));
      setError(null);
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      setData([]);
      setRawData([]);

      Logger.error(
        typeRequest
          ? `Error al obtener solicitudes de tipo "${requestTypeLabels[typeRequest]}"`
          : "Error al obtener solicitudes",
        errorObj,
        { effectiveEmployeeId, typeRequest },
      );

      const errorConfig = modalErrorConfig[ERROR_CODE_GET_HR_REQUESTS_FAILED];

      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
        solutionText: errorConfig.solutionText,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [typeRequest, effectiveEmployeeId]);

  return { data, rawData, isLoading, error, refetch: fetchData };
};
