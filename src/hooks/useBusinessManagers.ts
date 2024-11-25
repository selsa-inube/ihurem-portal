import { useState, useEffect } from "react";
import { businessManagers } from "@services/employeePortal/getBusinessManager";
import {
  IBusinessManagers,
  IEmployeePortalByBusinessManager,
} from "@ptypes/employeePortalBusiness.types";

export const useBusinessManagers = (
  portalPublicCode: IEmployeePortalByBusinessManager,
) => {
  const [businessManagersData, setBusinessManagersData] =
    useState<IBusinessManagers>({} as IBusinessManagers);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const fetchBusinessManagers = async () => {
      if (!portalPublicCode) return;
      try {
        const fetchedBusinessManagers = await businessManagers(
          portalPublicCode.businessManagerId,
        );
        if (!fetchedBusinessManagers) {
          setHasError(true);
          return;
        }
        setBusinessManagersData(fetchedBusinessManagers);
      } catch (error) {
        setHasError(true);
      }
    };

    fetchBusinessManagers();
  }, [portalPublicCode]);

  return { businessManagersData, hasError };
};
