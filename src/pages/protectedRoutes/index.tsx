import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { ErrorPage } from "@components/layout/ErrorPage";
import { decrypt, encrypt } from "@utils/encrypt";
import { usePortalData } from "@hooks/usePortalData";
import { useBusinessManagers } from "@hooks/useBusinessManagers";
import { GlobalStyles } from "@styles/global";
import { AppProvider } from "@context/AppContext";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";
import { useIAuth } from "@context/AuthContext/useAuthContext";
import { useBusinessUnit } from "@hooks/useBusinessUnit";
import { useEmployeeByIdentification } from "@hooks/useEmployeeInquiry";
import { useEmployeeOptions } from "@hooks/useEmployeeOptions";
import { usePostUserAccountsData } from "@hooks/usePostUserAccountsData";
import { IUser } from "@context/AppContext/types";
import { pathStart } from "@config/nav.config";
import { InfoModal } from "@components/modals/InfoModal";
import { protectedRouter } from "@routes/publicRouter";

export function ProtectedRoutes() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalParam = params.get("portal");
  const storedPortal = localStorage.getItem("portalCode");
  const decryptedPortal = storedPortal ? decrypt(storedPortal) : "";
  const portalCode = portalParam ?? decryptedPortal;
  const { setUser } = useIAuth();

  const [showExternalAuthNotification, setShowExternalAuthNotification] =
    useState(false);
  const [externalAuthProvider, setExternalAuthProvider] = useState<
    string | null
  >(null);

  if (!portalCode) {
    return <ErrorPage errorCode={1000} />;
  }

  useEffect(() => {
    if (portalParam && portalParam !== decryptedPortal) {
      const encryptedPortal = encrypt(portalParam);
      localStorage.setItem("portalCode", encryptedPortal);
    }
  }, [portalParam, decryptedPortal]);

  const [isReady, setIsReady] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useIAuth();

  const { portalData, hasError } = usePortalData(portalCode ?? "");

  const {
    businessManagersData,
    hasError: hasManagersError,
    codeError: BusinessManagersCode,
  } = useBusinessManagers(portalData);

  const {
    businessUnitData,
    hasError: hasBusinessUnitError,
    codeError: BusinessUnit,
  } = useBusinessUnit(portalData);

  const identificationNumber = user?.id ?? "";
  const identificationType = user?.identificationType ?? "";

  const {
    employee,
    loading: employeeLoading,
    error: employeeError,
    codeError: employeeCode,
  } = useEmployeeByIdentification(
    identificationType,
    identificationNumber,
    businessUnitData.publicCode ?? "",
  );

  const {
    data: employeeOptions,
    loading: optionsLoading,
    error: optionsError,
    codeError: optionsCode,
  } = useEmployeeOptions(user?.nickname ?? "");

  const { data: userAccountsData, isLoading: userAccountsLoading } =
    usePostUserAccountsData(
      businessManagersData.clientId,
      businessManagersData.clientSecret,
    );

  useEffect(() => {
    if (userAccountsData?.idToken) {
      const decoded = jwtDecode<{
        identificationNumber: string;
        identificationType: string;
        names: string;
        surNames: string;
        userAccount: string;
        consumerApplicationCode: string;
      }>(userAccountsData.idToken);

      const mappedUser: IUser = {
        id: decoded.identificationNumber,
        identificationType: decoded.identificationType,
        username: `${decoded.names} ${decoded.surNames}`,
        nickname: decoded.userAccount,
        company: decoded.consumerApplicationCode,
        urlImgPerfil: "",
      };

      setUser(mappedUser);
    }
  }, [userAccountsData, setUser]);

  useEffect(() => {
    if (portalData && portalData.externalAuthenticationProvider !== undefined) {
      const externalAuthProvider = portalData.externalAuthenticationProvider;
      if (!externalAuthProvider) {
        if (!isAuthenticated && !isLoading) {
          loginWithRedirect({
            authorizationParams: {
              connection: "google-oauth2",
            },
            appState: {
              returnTo: window.location.pathname,
            },
          });
        }
      } else {
        setExternalAuthProvider(externalAuthProvider);
        setShowExternalAuthNotification(true);
      }
    }
  }, [portalData, isAuthenticated, isLoading, loginWithRedirect]);

  useEffect(() => {
    if (
      !isLoading &&
      !isAuthenticated &&
      !hasError &&
      !pathStart.includes(window.location.pathname) &&
      !portalData.externalAuthenticationProvider
    ) {
      loginWithRedirect({
        authorizationParams: {
          connection: "google-oauth2",
        },
        appState: {
          returnTo: window.location.pathname,
        },
      });
    } else {
      setIsReady(true);
    }
  }, [
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    portalData.externalAuthenticationProvider,
    hasError,
    pathStart,
  ]);

  const handleCloseExternalAuthNotification = () => {
    setShowExternalAuthNotification(false);
  };

  if (
    isLoading ||
    !isReady ||
    employeeLoading ||
    optionsLoading ||
    userAccountsLoading
  ) {
    return <LoadingAppUI />;
  }

  const errorCode =
    BusinessManagersCode ??
    BusinessUnit ??
    employeeCode ??
    optionsCode ??
    (employee && employee.identificationType !== identificationType
      ? 1004
      : 1001);

  if (
    hasError ||
    hasManagersError ||
    hasBusinessUnitError ||
    employeeError ||
    optionsError ||
    (employee && employee.identificationType !== identificationType)
  ) {
    return <ErrorPage errorCode={errorCode} />;
  }

  return (
    <>
      <AppProvider
        dataPortal={portalData}
        businessManagersData={businessManagersData}
        businessUnitData={businessUnitData}
        employee={employee}
        employeeOptions={employeeOptions}
      >
        <GlobalStyles />
        <RouterProvider router={protectedRouter} />
      </AppProvider>

      {showExternalAuthNotification && (
        <InfoModal
          title="Método de autenticación diferente"
          titleDescription="Proveedor de autenticación externo"
          description={`Este portal utiliza un método de autenticación externo a través de ${externalAuthProvider}. Por favor, utiliza las credenciales correspondientes a este proveedor para acceder al sistema.`}
          buttonText="Entendido"
          onCloseModal={handleCloseExternalAuthNotification}
          portalId="root"
        />
      )}
    </>
  );
}
