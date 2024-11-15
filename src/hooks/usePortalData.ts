import { useState, useEffect } from "react";
import { encrypt } from "@utils/encrypt";
import { staffPortalByBusinessManager } from "@src/services/staffPortal/getStaffPortalByBusinessManager";

export const usePortalData = (codeParame: string) => {
  const [portalData, setPortalData] = useState({});
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        const staffPortalData = await staffPortalByBusinessManager(codeParame);
        if (!staffPortalData || Object.keys(staffPortalData).length === 0) {
          setHasError(true);
          return;
        }
        const encryptedParamValue = encrypt(codeParame);
        localStorage.setItem("portalCode", encryptedParamValue);
        setPortalData(staffPortalData);
      } catch (error) {
        console.error(error);
        setHasError(true);
      }
    };

    void fetchPortalData();
  }, [codeParame]);

  return { portalData, hasError };
};
