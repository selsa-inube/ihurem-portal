import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { useIAuth } from "@inube/iauth-react";

import { ErrorPage } from "@components/layout/ErrorPage";
import { GlobalStyles } from "@styles/global";
import { AppProvider } from "@context/AppContext";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";
import { useBusinessUnit } from "@hooks/useBusinessUnit";
import { useEmployeeByIdentification } from "@hooks/useEmployeeInquiry";
import { useEmployeeOptions } from "@hooks/useEmployeeOptions";
import { pathStart } from "@config/nav.config";
import { InfoModal } from "@components/modals/InfoModal";
import { protectedRouter } from "@routes/publicRouter";
import { useSignOut } from "@hooks/useSignOut";
import { usePortalAuth } from "@hooks/usePortalAuth";
import { useEmployeeContracts } from "@hooks/useEmployeeContract";
import { Logger } from "@utils/logger";

export function ProtectedRoutes() {
  const {
    portalCode,
    portalData,
    hasPortalError,
    hasManagersError,
    businessManagersData,
    errorCode: managersErrorCode,
  } = usePortalAuth();

  const { signOut } = useSignOut();

  const [showExternalAuthNotification, setShowExternalAuthNotification] =
    useState(false);
  const [externalIAuthProvider, setExternalIAuthProvider] = useState<
    string | null
  >(null);

  if (!portalCode) {
    return <ErrorPage errorCode={1000} />;
  }

  const [isReady, setIsReady] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading, user, error } =
    useIAuth();

  if (error) {
    signOut("/error?code=1006");
  }

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
  } = useEmployeeOptions(
    user?.nickname ?? "",
    businessUnitData.publicCode ?? "",
  );

  const {
    contracts,
    loading: contractsLoading,
    error: contractsError,
    codeError: contractsCode,
  } = useEmployeeContracts(businessUnitData.publicCode ?? "");

  useEffect(() => {
    if (!contractsLoading && contracts.length > 0) {
      const formalizedContract = contracts.find(
        (c) => c.contractStatus === "formalized",
      );

      if (!formalizedContract) {
        Logger.warn(
          "[ProtectedRoutes] No hay contrato formalizado. Cerrando sesión.",
        );
        signOut(`/error?code=1024`);
      }
    }
  }, [contracts, contractsLoading, signOut]);
  useEffect(() => {
    if (portalData?.externalAuthenticationProvider !== undefined) {
      const externalProvider = portalData.externalAuthenticationProvider;
      if (!externalProvider) {
        if (
          !isAuthenticated &&
          !isLoading &&
          window.location.pathname !== "/self-registration"
        ) {
          loginWithRedirect();
        }
      } else {
        setExternalIAuthProvider(externalProvider);
        setShowExternalAuthNotification(true);
      }
    }
  }, [portalData, isAuthenticated, isLoading, loginWithRedirect]);

  useEffect(() => {
    if (
      !isLoading &&
      !isAuthenticated &&
      !hasPortalError &&
      !pathStart.includes(window.location.pathname) &&
      !portalData.externalAuthenticationProvider &&
      window.location.pathname !== "/self-registration"
    ) {
      loginWithRedirect();
    } else {
      setIsReady(true);
    }
  }, [
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    portalData.externalAuthenticationProvider,
    hasPortalError,
    pathStart,
  ]);

  const handleCloseExternalAuthNotification = () => {
    setShowExternalAuthNotification(false);
  };

  if (
    isLoading ||
    contractsLoading ||
    employeeLoading ||
    optionsLoading ||
    !isReady
  ) {
    return <LoadingAppUI />;
  }

  const errorCode =
    managersErrorCode ??
    BusinessUnit ??
    employeeCode ??
    optionsCode ??
    contractsCode ??
    (employee && employee.identificationType !== identificationType
      ? 1004
      : 1001);

  if (
    hasPortalError ||
    hasManagersError ||
    hasBusinessUnitError ||
    employeeError ||
    optionsError ||
    contractsError
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
        contracts={contracts}
      >
        <GlobalStyles />
        <RouterProvider router={protectedRouter} />
      </AppProvider>

      {showExternalAuthNotification && (
        <InfoModal
          title="Método de autenticación diferente"
          titleDescription="Proveedor de autenticación externo"
          description={`Este portal utiliza un método de autenticación externo a través de ${externalIAuthProvider}. Por favor, utiliza las credenciales correspondientes a este proveedor para acceder al sistema.`}
          buttonText="Entendido"
          onCloseModal={handleCloseExternalAuthNotification}
          portalId="root"
        />
      )}
    </>
  );
}
