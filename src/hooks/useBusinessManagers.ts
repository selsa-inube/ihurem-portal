import { useState, useEffect } from "react";

import {
  IBusinessManagers,
  IEmployeePortalByBusinessManager,
} from "@ptypes/employeePortalBusiness.types";
import { getBusinessManagers } from "@services/employeePortal/getBusinessManager";

export const useBusinessManagers = (
  portalPublicCode: IEmployeePortalByBusinessManager,
) => {
  const [businessManagersData, setBusinessManagersData] =
    useState<IBusinessManagers>({} as IBusinessManagers);
  const [hasError, setHasError] = useState(false);
  const [codeError, setCodeError] = useState<number | undefined>(undefined);
  useEffect(() => {
    const fetchBusinessManagers = async () => {
      if (!portalPublicCode) return;
      try {
        const fetchedBusinessManagers = await getBusinessManagers(
          portalPublicCode.businessManagerId,
        );

        if (!fetchedBusinessManagers) {
          setHasError(true);
          return;
        }
        setBusinessManagersData(fetchedBusinessManagers);
      } catch (error) {
        console.log(error);
        setHasError(true);
      }
      if (hasError) {
        setCodeError(1002);
      }
    };

    fetchBusinessManagers();
  }, [portalPublicCode]);

  return { businessManagersData, hasError, codeError };
};
