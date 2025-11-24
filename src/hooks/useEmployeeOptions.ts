import { useState, useEffect } from "react";

import { getEmployeeOptions } from "@services/employeePortal/getOptionsConsultation";
import { IEmployeeOptions } from "@ptypes/employeePortalBusiness.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

import { useSignOut } from "./useSignOut";

export const useEmployeeOptions = (
  employeeId: string,
  businessUnitPublicCode?: string,
) => {
  const [data, setData] = useState<IEmployeeOptions[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<number | undefined>(undefined);

  const { signOut } = useSignOut();
  const { showErrorModal } = useErrorModal();

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
        setLoading(false);
        const errorConfig = modalErrorConfig[1005];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${errorMessage}`,
          solutionText: errorConfig.solutionText,
          redirectOnClose: true,
        });
      }
      if (error) {
        setCodeError(1005);
      }
    };

    if (employeeId || businessUnitPublicCode) {
      fetchOptions();
    }
  }, [employeeId, businessUnitPublicCode]);

  return { data, loading, error, codeError };
};
