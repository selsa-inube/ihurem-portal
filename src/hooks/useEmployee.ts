import { useState, useEffect, useCallback } from "react";

import { getEmployeeById } from "@services/employeeConsultation/getEmployeeById";
import { Employee } from "@ptypes/employeePortalConsultation.types";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { useHeaders } from "@hooks/useHeaders";

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
  const [flagShown, setFlagShown] = useState(false);
  const [employeeId, setEmployeeId] = useState<string>(initialEmployeeId);
  const { getHeaders } = useHeaders();

  useErrorFlag(
    flagShown,
    "Error al obtener información del empleado",
    error?.message ?? "Error en la solicitud",
    false,
  );

  const fetchEmployee = useCallback(
    async (id = employeeId) => {
      setIsLoading(true);
      setError(null);
      setFlagShown(false);

      try {
        const headers = await getHeaders();
        const data = await getEmployeeById(id, headers);
        setEmployee(data);
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        setFlagShown(true);
      } finally {
        setIsLoading(false);
        setFlagShown(false);
      }
    },
    [employeeId],
  );

  useEffect(() => {
    fetchEmployee(employeeId);
  }, [fetchEmployee, employeeId]);

  const refetch = (newId: string = employeeId) => {
    setEmployeeId(newId);
    fetchEmployee(newId);
  };

  return { employee, isLoading, error, refetch };
};
