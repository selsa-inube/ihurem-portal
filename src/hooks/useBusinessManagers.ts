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
  const [codeError, setCodeError] = useState<number | undefined>(undefined);

  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    const fetchBusinessManagers = async () => {
      if (!portalPublicCode) return;

      try {
        const headers = getPreAuthHeaders();

        const fetchedBusinessManagers = await getBusinessManagers(
          portalPublicCode.businessManagerId,
          headers,
        );

        if (!fetchedBusinessManagers) {
          setHasError(true);
          return;
        }

        if (Object.keys(fetchedBusinessManagers).length === 0) {
          setCodeError(1002);
          return;
        }

        setBusinessManagersData(fetchedBusinessManagers);
        setHasError(false);
      } catch (error) {
        setHasError(true);

        const errorMessage =
          error instanceof Error
            ? error.message
            : "Ocurrió un error al actualizar la solicitud";

        const errorConfig = modalErrorConfig[1002];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${errorMessage}`,
          solutionText: errorConfig.solutionText,
        });

        setCodeError(1002);
      }
    };

    fetchBusinessManagers();
  }, [portalPublicCode, showErrorModal]);

  return { businessManagersData, hasError, codeError };
};
