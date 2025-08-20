import { useState, useEffect } from "react";

import {
  HumanResourceRequest,
  ERequestType,
  requestTypeMap,
} from "@ptypes/humanResourcesRequest.types";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";
import { useHeaders } from "@hooks/useHeaders";
import { useAppContext } from "@context/AppContext";

import { useContractValidation } from "./useContractValidation";
import { useErrorFlag } from "./useErrorFlag";

export const useHumanResourceRequests = <T>(
  formatData: (data: HumanResourceRequest[]) => T[],
  typeRequest?: ERequestType,
  employeeId?: string,
) => {
  const [data, setData] = useState<T[]>([]);
  const [rawData, setRawData] = useState<HumanResourceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [flagShown, setFlagShown] = useState(false);

  const { getHeaders } = useHeaders();
  const { employees } = useAppContext();

  useContractValidation();

  const effectiveEmployeeId = employeeId ?? employees?.employeeId;

  useErrorFlag(
    flagShown,
    typeRequest
      ? `Error al obtener solicitudes de tipo "${typeRequest}"`
      : "Error al obtener solicitudes",
    "Error en la solicitud",
    false,
  );

  const fetchData = async () => {
    if (!effectiveEmployeeId) return;
    setIsLoading(true);
    setFlagShown(false);

    try {
      const headers = await getHeaders();
      // 👇 Traducción del tipo para backend
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
      setError(err instanceof Error ? err : new Error(String(err)));
      setData([]);
      setRawData([]);
      setFlagShown(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [typeRequest, effectiveEmployeeId]);

  return { data, rawData, isLoading, error, refetch: fetchData };
};
