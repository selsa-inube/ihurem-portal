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
  skip?: boolean,
) => {
  const [businessManagersData, setBusinessManagersData] =
    useState<IBusinessManagers>({} as IBusinessManagers);

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [codeError, setCodeError] = useState<number | undefined>();

  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    const fetchBusinessManager = async () => {
      if (skip || !portalPublicCode?.businessManagerCode) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setHasError(false);

      try {
        const headers = getPreAuthHeaders();

        const businessManager = await getBusinessManagers(
          headers,
          portalPublicCode.businessManagerCode,
        );

        if (!businessManager) {
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

        setBusinessManagersData(businessManager);
        setHasError(false);
      } catch (error) {
        setHasError(true);
        setCodeError(1002);

        const errorMessage =
          error instanceof Error ? error.message : "Ocurrió un error";

        const errorConfig = modalErrorConfig[1002];

        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${errorMessage}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessManager();
  }, [portalPublicCode?.businessManagerCode, skip, showErrorModal]);

  return {
    businessManagersData,
    hasError,
    codeError,
    isLoading,
  };
};
