import { useState, useEffect } from "react";
import { encrypt } from "@utils/encrypt";

import { staffPortalByBusinessManager } from "@src/services/staffPortal/getStaffPortalByBusinessManager";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortalBusiness.types";

export const usePortalData = (codeParame: string) => {
  const [portalData, setPortalData] = useState<IStaffPortalByBusinessManager>(
    {} as IStaffPortalByBusinessManager,
  );
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        const StaffPortalData = await staffPortalByBusinessManager(codeParame);
        if (Object.keys(StaffPortalData).length === 0) {
          setHasError(true);
          return;
        }
        const encryptedParamValue = encrypt(codeParame);
        localStorage.setItem("portalCode", encryptedParamValue);
        setPortalData(StaffPortalData);
      } catch (error) {
        console.info(error);
        setHasError(true);
      }
    };

    void fetchPortalData();
  }, []);

  return { portalData, hasError };
};
