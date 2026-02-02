import { useState, useEffect } from "react";

import { Logger } from "@utils/logger";
import { encrypt } from "@utils/encrypt";
import { employeePortalByBusinessManager } from "@services/employeePortal/getEmployeePortalByBusinessManager";
import { IEmployeePortalByBusinessManager } from "@ptypes/employeePortalBusiness.types";
import { getPreAuthHeaders } from "@utils/preAuthHeaders";

export const usePortalData = (codeParame: string) => {
  const [portalData, setPortalData] =
    useState<IEmployeePortalByBusinessManager>(
      {} as IEmployeePortalByBusinessManager,
    );
  const [hasError, setHasError] = useState(true);

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        const headers = getPreAuthHeaders();
        const employeePortalData =
          await employeePortalByBusinessManager(headers);

        if (
          !employeePortalData ||
          Object.keys(employeePortalData).length === 0
        ) {
          setHasError(true);
          return;
        }

        const encryptedParamValue = encrypt(codeParame);
        localStorage.setItem("portalCode", encryptedParamValue);
        setPortalData(employeePortalData);
        setHasError(false);
      } catch (error) {
        Logger.error("Error fetching portal data", error as Error, {
          codeParame,
        });
        setHasError(true);
      }
    };

    void fetchPortalData();
  }, [codeParame]);

  return { portalData, hasError };
};
