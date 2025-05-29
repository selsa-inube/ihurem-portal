import { useState, useEffect } from "react";

import { encrypt } from "@utils/encrypt";
import { employeePortalByBusinessManager } from "@services/employeePortal/getEmployeePortalByBusinessManager";
import { IEmployeePortalByBusinessManager } from "@ptypes/employeePortalBusiness.types";

export const usePortalData = (codeParame: string) => {
  const [portalData, setPortalData] =
    useState<IEmployeePortalByBusinessManager>(
      {} as IEmployeePortalByBusinessManager,
    );
  const [hasError, setHasError] = useState(true);

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        const employeePortalData =
          await employeePortalByBusinessManager(codeParame);
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
        console.error(error);
        setHasError(true);
      }
    };

    void fetchPortalData();
  }, [codeParame]);

  return { portalData, hasError };
};
