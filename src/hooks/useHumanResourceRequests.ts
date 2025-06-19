import { useState, useEffect } from "react";

import {
  HumanResourceRequest,
  ERequestType,
} from "@ptypes/humanResourcesRequest.types";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";
import { useHeaders } from "@hooks/useHeaders";
import { useAppContext } from "@context/AppContext";

import { useContractValidation } from "./useContractValidation";
import { useErrorFlag } from "./useErrorFlag";

type RequestType = keyof typeof ERequestType;

export const useHumanResourceRequests = <T>(
  formatData: (data: HumanResourceRequest[]) => T[],
  typeRequest: RequestType,
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
      ? `Error al obtener solicitudes de tipo "${ERequestType[typeRequest]}"`
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
      const requests = await getHumanResourceRequests(
        typeRequest,
        effectiveEmployeeId,
        headers,
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
