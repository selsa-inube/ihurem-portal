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
    const fetchBusinessManagers = async () => {
      if (!portalPublicCode) return;
      try {
        const fetchBusinessUnit = await businessUnitsPortalEmployee(
          portalPublicCode.businessUnit,
        );
        if (!fetchBusinessUnit) {
          setHasError(true);
          return;
        }
        setBusinessUnit(fetchBusinessUnit);
      } catch (error) {
        console.log(error);
        setHasError(true);
      }
      if (hasError) {
        setCodeError(1003);
      }
    };

    fetchBusinessManagers();
  }, [portalPublicCode]);

  return { businessUnitData, hasError, codeError };
};
