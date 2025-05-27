import { useState, useEffect } from "react";

import {
  IBusinessUnitsPortalEmployee,
  IEmployeePortalByBusinessManager,
} from "@ptypes/employeePortalBusiness.types";
import { businessUnitsPortalEmployee } from "@services/employeePortal/getBusinessUnits";

export const useBusinessUnit = (
  portalPublicCode: IEmployeePortalByBusinessManager,
) => {
  const [businessUnitData, setBusinessUnit] =
    useState<IBusinessUnitsPortalEmployee>({} as IBusinessUnitsPortalEmployee);
  const [hasError, setHasError] = useState(false);
  const [codeError, setCodeError] = useState<number | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    const fetchBusinessManagers = async () => {
      if (!portalPublicCode) return;
      try {
        const fetchBusinessUnit = await businessUnitsPortalEmployee(
          portalPublicCode.businessUnit,
        );
        if (!fetchBusinessUnit) {
          if (isMounted) {
            setHasError(true);
            setCodeError(1003);
          }
          return;
        }
        if (isMounted) {
          setBusinessUnit(fetchBusinessUnit);
          setHasError(false);
          setCodeError(undefined);
        }
      } catch (error) {
        console.log(error);
        if (isMounted) {
          setHasError(true);
          setCodeError(1003);
        }
      }
    };

    fetchBusinessManagers();

    return () => {
      isMounted = false;
    };
  }, [portalPublicCode]);

  return { businessUnitData, hasError, codeError };
};
