import { useState, useEffect, useRef } from "react";

import { Logger } from "@utils/logger";
import { getEmployeeById } from "@services/employeeConsultation/getEmployeeById";
import { Employee } from "@ptypes/employeePortalConsultation.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { useHeaders } from "@hooks/useHeaders";

const ERROR_CODE_GET_EMPLOYEE_FAILED = 1010;

interface UseEmployeeResult {
  employee: Employee;
  isLoading: boolean;
  error: Error | null;
  refetch: (id?: string) => void;
}

export const useEmployee = (initialEmployeeId: string): UseEmployeeResult => {
  const [employee, setEmployee] = useState<Employee>({} as Employee);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [employeeId, setEmployeeId] = useState<string>(initialEmployeeId);
  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();
  const hasFetchedRef = useRef(false);
  const currentEmployeeIdRef = useRef<string>("");

  useEffect(() => {
    const fetchEmployee = async () => {
      if (
        !employeeId ||
        hasFetchedRef.current ||
        currentEmployeeIdRef.current === employeeId
      ) {
        return;
      }

      hasFetchedRef.current = true;
      currentEmployeeIdRef.current = employeeId;
      setIsLoading(true);
      setError(null);

      try {
        const headers = await getHeaders();
        const data = await getEmployeeById(employeeId, headers);
        setEmployee(data);
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);

        Logger.error("Error al obtener información del empleado", errorObj, {
          employeeId,
        });
        const errorConfig = modalErrorConfig[ERROR_CODE_GET_EMPLOYEE_FAILED];

        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setIsLoading(false);
        hasFetchedRef.current = false;
      }
    };

    fetchEmployee();
  }, [employeeId, getHeaders, showErrorModal]);

  const refetch = (newId?: string) => {
    const idToFetch = newId ?? employeeId;
    currentEmployeeIdRef.current = "";
    hasFetchedRef.current = false;

    if (newId && newId !== employeeId) {
      setEmployeeId(newId);
    } else {
      setEmployeeId("");
      setTimeout(() => setEmployeeId(idToFetch), 0);
    }
  };

  return { employee, isLoading, error, refetch };
};
