import { useState, useEffect } from "react";

import {
  IBusinessManagers,
  IEmployeePortalByBusinessManager,
} from "@ptypes/employeePortalBusiness.types";
import { getBusinessManagers } from "@services/employeePortal/getBusinessManager";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { getPreAuthHeaders } from "@utils/preAuthHeaders";

export const useBusinessManagers = (
  portalPublicCode: IEmployeePortalByBusinessManager,
) => {
  const [businessManagersData, setBusinessManagersData] =
    useState<IBusinessManagers>({} as IBusinessManagers);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [codeError, setCodeError] = useState<number | undefined>(undefined);

  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    const fetchBusinessManagers = async () => {
      if (!portalPublicCode?.businessManagerId) {
        setIsLoading(true);
        return;
      }

      setIsLoading(true);
      setHasError(false);

      try {
        const headers = getPreAuthHeaders();

        const fetchedBusinessManagers = await getBusinessManagers(
          portalPublicCode.businessManagerId,
          headers,
        );

        if (!fetchedBusinessManagers) {
          setHasError(true);
          setCodeError(1002);
          setIsLoading(false);
          return;
        }

        if (Object.keys(fetchedBusinessManagers).length === 0) {
          setHasError(true);
          setCodeError(1002);
          setIsLoading(false);

          const errorConfig = modalErrorConfig[1002];
          showErrorModal({
            descriptionText: errorConfig.descriptionText,
            solutionText: errorConfig.solutionText,
          });
          return;
        }

        setBusinessManagersData(fetchedBusinessManagers);
        setHasError(false);
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
        setCodeError(1002);
        setIsLoading(false);

        const errorMessage =
          error instanceof Error
            ? error.message
            : "Ocurrió un error al actualizar la solicitud";

        const errorConfig = modalErrorConfig[1002];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${errorMessage}`,
          solutionText: errorConfig.solutionText,
        });
      }
    };

    fetchBusinessManagers();
  }, [portalPublicCode?.businessManagerId, showErrorModal]);

  return { businessManagersData, hasError, codeError, isLoading };
};
