import { useEffect, useState } from "react";

import { getEmployeeAbsences } from "@services/employeeAbsences";
import { EmployeeAbsence } from "@ptypes/employeeAbsence.types";

import { useHeaders } from "@hooks/useHeaders";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_GET_EMPLOYEE_ABSENCES_FAILED = 1022;

export const useEmployeeAbsences = <T>(
  formatData: (data: EmployeeAbsence[]) => T[],
  page = 1,
  perPage = 50,
  employeeId?: string,
) => {
  const [data, setData] = useState<T[]>([]);
  const [rawData, setRawData] = useState<EmployeeAbsence[]>([]);
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

      const absences = await getEmployeeAbsences(
        effectiveEmployeeId,
        headers,
        page,
        perPage,
      );

      const absencesData = absences ?? [];

      setRawData(absencesData);
      setData(formatData(absencesData));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData([]);
      setRawData([]);

      console.error("Error al obtener ausencias del empleado", err);

      const errorConfig =
        modalErrorConfig[ERROR_CODE_GET_EMPLOYEE_ABSENCES_FAILED];

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
  }, [effectiveEmployeeId, page, perPage]);

  return { data, rawData, isLoading, error, refetch: fetchData };
};
