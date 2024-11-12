import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  IBusinessManagers,
  IStaffPortalByBusinessManager,
} from "@ptypes/staffPortalBusiness.types";
import { encrypt } from "@utils/encrypt";

export const useAuthRedirect = (
  portalPublicCode: IStaffPortalByBusinessManager[],
  businessManagersData: IBusinessManagers,
  portalCode: string | null,
) => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasRedirected) return;

    const portalPublicCodeFiltered = portalPublicCode.filter(
      (data) => data.staffPortalId === portalCode,
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
