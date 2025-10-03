import { useState, useEffect } from "react";

import { getEmployeeOptions } from "@services/employeePortal/getOptionsConsultation";
import { IEmployeeOptions } from "@ptypes/employeePortalBusiness.types";

import { useSignOut } from "./useSignOut";

export const useEmployeeOptions = (employeeId: string) => {
  const [data, setData] = useState<IEmployeeOptions[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<number | undefined>(undefined);

  const { signOut } = useSignOut();

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      setError(null);

      try {
        const options = await getEmployeeOptions();
        if (options.length === 0) {
          setError("No existen opciones para el empleado");
          signOut("/error?code=1005");
        }
        setData(options);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Error al obtener las opciones del empleado";
        setError(errorMessage);
      }
      if (error) {
        setCodeError(1005);
      }
    };

    if (employeeId) {
      fetchOptions();
    }
  }, [employeeId]);

  return { data, loading, error, codeError };
};
