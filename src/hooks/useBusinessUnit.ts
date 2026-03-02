import { useState, useEffect } from "react";

import { Logger } from "@utils/logger";
import {
  IBusinessUnitsPortalEmployee,
  IEmployeePortalByBusinessManager,
} from "@ptypes/employeePortalBusiness.types";
import { businessUnitsPortalEmployee } from "@services/employeePortal/getBusinessUnits";
import { getPreAuthHeaders } from "@utils/preAuthHeaders";

export const useBusinessUnit = (
  portalPublicCode: IEmployeePortalByBusinessManager,
) => {
  const [businessUnitData, setBusinessUnit] =
    useState<IBusinessUnitsPortalEmployee>({} as IBusinessUnitsPortalEmployee);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [codeError, setCodeError] = useState<number | undefined>();

  useEffect(() => {
    let isMounted = true;

    const fetchBusinessUnitData = async () => {
      if (!portalPublicCode?.businessUnitCode) {
        if (isMounted) setIsLoading(false);
        return;
      }

      if (isMounted) {
        setIsLoading(true);
        setHasError(false);
      }

      try {
        const headers = getPreAuthHeaders();

        const response = await businessUnitsPortalEmployee(
          headers,
          portalPublicCode.businessUnitCode,
        );

        const businessUnit = response[0];

        if (!businessUnit) {
          if (isMounted) {
            setHasError(true);
            setCodeError(1003);
            setIsLoading(false);
          }
          return;
        }

        if (isMounted) {
          setBusinessUnit(businessUnit);
          setHasError(false);
          setCodeError(undefined);
          setIsLoading(false);
        }
      } catch (error) {
        Logger.error("Error obteniendo la unidad de negocio", error as Error, {
          portalPublicCode,
        });

        if (isMounted) {
          setHasError(true);
          setCodeError(1003);
          setIsLoading(false);
        }
      }
    };

    fetchBusinessUnitData();

    return () => {
      isMounted = false;
    };
  }, [portalPublicCode?.businessUnitCode]);

  return { businessUnitData, hasError, codeError, isLoading };
};
