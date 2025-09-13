import { useState, useEffect, ReactNode } from "react";
import { IAuthProvider } from "@inube/iauth-react";

import { environment } from "@config/environment";
import { usePortalData } from "@hooks/usePortalData";
import { useBusinessManagers } from "@hooks/useBusinessManagers";
import { decrypt, encrypt } from "@utils/encrypt";
import { ErrorPage } from "@components/layout/ErrorPage";

interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const [authConfig, setAuthConfig] = useState<{
    clientId: string;
    clientSecret: string;
  } | null>(null);

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalParam = params.get("portal");
  const storedPortal = localStorage.getItem("portalCode");
  const decryptedPortal = storedPortal ? decrypt(storedPortal) : "";
  const portalCode = portalParam ?? decryptedPortal;

  if (!portalCode) {
    return <ErrorPage errorCode={1000} />;
  }

  useEffect(() => {
    if (portalParam && portalParam !== decryptedPortal) {
      const encryptedPortal = encrypt(portalParam);
      localStorage.setItem("portalCode", encryptedPortal);
    }
  }, [portalParam, decryptedPortal]);

  const { portalData, hasError } = usePortalData(portalCode);
  const { businessManagersData, hasError: hasManagersError } =
    useBusinessManagers(portalData);

  useEffect(() => {
    if (
      businessManagersData.clientId &&
      businessManagersData.clientSecret &&
      !hasError &&
      !hasManagersError
    ) {
      setAuthConfig({
        clientId: businessManagersData.clientId,
        clientSecret: businessManagersData.clientSecret,
      });
    }
  }, [businessManagersData, hasError, hasManagersError]);

  if (hasError || hasManagersError || !authConfig) {
    return <ErrorPage errorCode={1000} />;
  }

  return (
    <IAuthProvider
      originatorId={environment.ORIGINATOR_ID}
      callbackUrl={environment.REDIRECT_URI}
      iAuthUrl={environment.IAUTH_URL}
      clientId={decrypt(authConfig.clientId)}
      clientSecret={decrypt(authConfig.clientSecret)}
    >
      {children}
    </IAuthProvider>
  );
}
