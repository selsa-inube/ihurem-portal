import { useEffect, useState } from "react";

import {
  IBusinessManagers,
  IEmployeePortalByBusinessManager,
} from "@ptypes/employeePortalBusiness.types";
import { encrypt } from "@utils/encrypt";
import { useIAuth } from "@context/authContext";

export const useAuthRedirect = (
  portalPublicCode: IEmployeePortalByBusinessManager[],
  businessManagersData: IBusinessManagers,
  portalCode: string | null,
) => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useIAuth();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasRedirected) return;

    const portalPublicCodeFiltered = portalPublicCode.filter(
      (data) => data.employeePortalId === portalCode,
    );

    if (portalPublicCode.length > 0) {
      if (
        portalPublicCodeFiltered.length > 0 &&
        businessManagersData &&
        !isLoading &&
        !isAuthenticated
      ) {
        const encryptedParamValue = encrypt(portalCode!);
        localStorage.setItem("portalCode", encryptedParamValue);
        void loginWithRedirect();
      } else if (isAuthenticated) {
        setHasRedirected(true);
      } else {
        setHasError(true);
      }
    } else {
      setHasError(true);
    }
  }, [
    portalPublicCode,
    businessManagersData,
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    hasRedirected,
    portalCode,
  ]);

  return { hasRedirected, hasError, isLoading, isAuthenticated };
};
