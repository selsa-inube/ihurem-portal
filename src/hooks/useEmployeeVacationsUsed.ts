import { useState, useEffect, useCallback, useRef } from "react";

import {
  getEmployeeVacationsUsed,
  IVacationUsedResponse,
  GetEmployeeVacationsUsedParams,
} from "@services/employeeConsultation/getEmployeeVacationsUsed";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { useHeaders } from "@hooks/useHeaders";

const ERROR_CODE_GET_VACATIONS_USED_FAILED = 1024;

interface UseEmployeeVacationsUsedResult {
  vacationsUsed: IVacationUsedResponse[];
  loadingVacations: boolean;
  error: string | null;
  refetch: () => void;
}

export const useEmployeeVacationsUsed = (
  params: GetEmployeeVacationsUsedParams = {},
): UseEmployeeVacationsUsedResult => {
  const { page = 1, perPage = 50, contractId, employeeId } = params;

  const [vacationsUsed, setVacationsUsed] = useState<IVacationUsedResponse[]>(
    [],
  );
  const [loadingVacations, setLoadingVacations] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { getHeaders } = useHeaders();

  const lastFetchedParams = useRef<string>("");
  const isInitialMount = useRef(true);

  const { showErrorModal } = useErrorModal();

  const fetchVacationsUsed = useCallback(
    async (forceRefetch = false) => {
      const currentParams = `${page}-${perPage}-${contractId ?? ""}-${employeeId ?? ""}`;

      if (
        !forceRefetch &&
        currentParams === lastFetchedParams.current &&
        !isInitialMount.current
      ) {
        return;
      }

      setLoadingVacations(true);
      setError(null);
      lastFetchedParams.current = currentParams;
      isInitialMount.current = false;

      try {
        const headers = await getHeaders();

        const data = await getEmployeeVacationsUsed(headers, {
          page,
          perPage,
          contractId,
          employeeId,
        });
        setVacationsUsed(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Ocurrió un error desconocido al obtener las vacaciones utilizadas";

        setError(errorMessage);
        const errorConfig =
          modalErrorConfig[ERROR_CODE_GET_VACATIONS_USED_FAILED];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
          solutionText: errorConfig.solutionText,
        });
        setVacationsUsed([]);
      } finally {
        setLoadingVacations(false);
      }
    },
    [page, perPage, contractId, employeeId, getHeaders, showErrorModal],
  );

  useEffect(() => {
    fetchVacationsUsed();
  }, [page, perPage, contractId, employeeId]);

  const refetch = useCallback(() => {
    fetchVacationsUsed(true);
  }, [fetchVacationsUsed]);

  return { vacationsUsed, loadingVacations, error, refetch };
};
