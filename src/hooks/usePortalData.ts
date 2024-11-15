import { useState, useEffect } from "react";
import { encrypt } from "@utils/encrypt";
import { employeePortalByBusinessManager } from "@src/services/employeePortal/getEmployeePortalByBusinessManager";

export const usePortalData = (codeParame: string) => {
  const [portalData, setPortalData] = useState({});
  const [hasError, setHasError] = useState(false);

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
      } catch (error) {
        console.error(error);
        setHasError(true);
      }
    };

    void fetchPortalData();
  }, [codeParame]);

  return { portalData, hasError };
};
