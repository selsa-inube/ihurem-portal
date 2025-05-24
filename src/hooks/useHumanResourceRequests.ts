import { useState, useEffect } from "react";

import { useAppContext } from "@context/AppContext";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useHeaders } from "./useHeaders";

export const useHumanResourceRequests = <T>(
  typeRequest: string,
  formatData: (data: HumanResourceRequest[]) => T[],
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getHeaders } = useHeaders();
  const { employees } = useAppContext();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const headers = await getHeaders();
      const requests = await getHumanResourceRequests(
        typeRequest,
        employees.employeeId,
        headers,
      );
      setData(formatData(requests ?? []));
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Error fetching human resource requests"),
      );
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [typeRequest]);

  return { data, isLoading, error, refetch: fetchData };
};
