import { useState, useEffect } from "react";

import { getEmployeeOptions } from "@services/employeePortal/getOptionsConsultation";
import { IEmployeeOptions } from "@ptypes/employeePortalBusiness.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { decrypt } from "@utils/encrypt";
import { useHeaders } from "@hooks/useHeaders";

import { useSignOut } from "./useSignOut";

export const useEmployeeOptions = (
  employeeId: string,
  businessUnitPublicCode?: string,
) => {
  const [data, setData] = useState<IEmployeeOptions[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<number | undefined>(undefined);

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalParam = params.get("portal");
  const storedPortal = localStorage.getItem("portalCode");
  const decryptedPortal = storedPortal ? decrypt(storedPortal) : "";
  const portalCode = portalParam ?? decryptedPortal;

  const { signOut } = useSignOut();
  const { showErrorModal } = useErrorModal();
  const { getHeaders } = useHeaders();

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      setError(null);

      try {
        const headers = await getHeaders(true);

        const options = await getEmployeeOptions(
          { employeePortalPublicCode: portalCode },
          headers,
        );

        if (options.length === 0) {
          setError("No existen opciones para el empleado");
          signOut("/error?code=1005");
        } else {
          setData(options);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Error al obtener las opciones del empleado";
        setError(errorMessage);

        const errorConfig = modalErrorConfig[1005];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${errorMessage}`,
          solutionText: errorConfig.solutionText,
          redirectOnClose: true,
        });
      } finally {
        setLoading(false);
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
