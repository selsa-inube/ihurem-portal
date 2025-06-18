import { useState, useEffect, useCallback, useRef } from "react";

import {
  getEmployeeVacationDays,
  IVacationDaysResponse,
} from "@services/employeeConsultation/getEmployeeVacationDays";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { useHeaders } from "@hooks/useHeaders";

interface UseEmployeeVacationDaysResult {
  vacationDays: IVacationDaysResponse[];
  loadingDays: boolean;
  error: string | null;
  refetch: () => void;
}

export const useEmployeeVacationDays = (
  employeeId: string | null,
): UseEmployeeVacationDaysResult => {
  const [vacationDays, setVacationDays] = useState<IVacationDaysResponse[]>([]);
  const [loadingDays, setLoadingDays] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { getHeaders } = useHeaders();

  const lastFetchedEmployeeId = useRef<string>("");
  const isInitialMount = useRef(true);

  useErrorFlag(!!error, error ?? undefined);

  const fetchVacationDays = useCallback(
    async (forceRefetch = false) => {
      if (!employeeId) {
        setVacationDays([]);
        return;
      }

      if (
        !forceRefetch &&
        employeeId === lastFetchedEmployeeId.current &&
        !isInitialMount.current
      ) {
        return;
      }

      setLoadingDays(true);
      setError(null);
      lastFetchedEmployeeId.current = employeeId;
      isInitialMount.current = false;

      try {
        const headers = await getHeaders();
        const data = await getEmployeeVacationDays(employeeId, headers);
        setVacationDays(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Ocurrió un error desconocido al obtener los días de vacaciones pendientes";

        setError(errorMessage);
        setVacationDays([]);
      } finally {
        setLoadingDays(false);
      }
    },
    [employeeId, getHeaders],
  );

  useEffect(() => {
    fetchVacationDays();
  }, [employeeId]);

  const refetch = useCallback(() => {
    fetchVacationDays(true);
  }, [fetchVacationDays]);

  return { vacationDays, loadingDays, error, refetch };
};
