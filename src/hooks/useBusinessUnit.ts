import { useState, useEffect } from "react";
import {
  IBusinessUnitsPortalEmployee,
  IEmployeePortalByBusinessManager,
} from "@ptypes/employeePortalBusiness.types";
import { businessUnitsPortalEmployee } from "@src/services/employeePortal/getBusinessUnits";

export const useBusinessUnit = (
  portalPublicCode: IEmployeePortalByBusinessManager,
) => {
  const [businessUnitData, setBusinessUnit] =
    useState<IBusinessUnitsPortalEmployee>({} as IBusinessUnitsPortalEmployee);
  const [hasError, setHasError] = useState(false);
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
        setHasError(true);
      }
    };

    fetchBusinessManagers();
  }, [portalPublicCode]);

  return { businessUnitData, hasError };
};
