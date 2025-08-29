import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { Home } from "@pages/home";
import { decrypt, encrypt } from "@utils/encrypt";
import { LoginRoutes } from "@routes/login";
import { GlobalStyles } from "@styles/global";
import { pathStart } from "@config/nav.config";
import { environment } from "@config/environment";
import { HolidaysRoutes } from "@routes/holidays";
import { AppPage } from "@components/layout/AppPage";
import { usePortalData } from "@hooks/usePortalData";
import { ErrorPage } from "@components/layout/ErrorPage";
import { useBusinessUnit } from "@hooks/useBusinessUnit";
import { CertificationsRoutes } from "@routes/certifications";
import { useEmployeeOptions } from "@hooks/useEmployeeOptions";
import { AppProvider } from "@context/AppContext";
import { useBusinessManagers } from "@hooks/useBusinessManagers";
import { useEmployeeByNickname } from "@hooks/useEmployeeInquiry";
import { useIAuth } from "@context/authContext";

import { InfoModal } from "./components/modals/InfoModal";
import { useAppContext } from "./context/AppContext/useAppContext";
import { SelfRegistrationRoutes } from "./routes/self-registration";
import { useContractValidation } from "./hooks/useContractValidation";
import { LoadingAppUI } from "./pages/login/outlets/LoadingApp/interface";

function LogOut() {
  localStorage.clear();
  const { logout } = useIAuth();
  logout({ logoutParams: { returnTo: environment.REDIRECT_URI } });
  return <ErrorPage errorCode={1000} />;
}

function FirstPage() {
  const { user, provisionedPortal } = useAppContext();

  return (provisionedPortal?.portalCode &&
    provisionedPortal.portalCode.length === 0) ||
    !user ? (
    <LoginRoutes />
  ) : (
    <Home />
  );
}

function ContractValidationWrapper() {
  const { contracts, areAllContractsFinalized } = useContractValidation();

  if (contracts.length > 0 && areAllContractsFinalized) {
    return <ErrorPage errorCode={1000} />;
  }

  return <FirstPage />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/self-registration" element={<SelfRegistrationRoutes />} />
      <Route path="/login/*" element={<LoginRoutes />} />
      <Route
        path="/*"
        element={<ContractValidationWrapper />}
        errorElement={<ErrorPage />}
      />
      <Route path="/*" element={<AppPage />}>
        <Route path="holidays/*" element={<HolidaysRoutes />} />
        <Route path="certifications/*" element={<CertificationsRoutes />} />
      </Route>
      <Route path="logout" element={<LogOut />} />
    </>,
  ),
);

function App() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalParam = params.get("portal");
  const storedPortal = localStorage.getItem("portalCode");
  const decryptedPortal = storedPortal ? decrypt(storedPortal) : "";
  const portalCode = portalParam ?? decryptedPortal;

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

  const numberDoc = "1062905485";
  const {
    employee,
    loading: employeeLoading,
    error: employeeError,
    codeError: employeeCode,
  } = useEmployeeByNickname(numberDoc ?? "", businessUnitData.publicCode ?? "");

  const {
    data: employeeOptions,
    loading: optionsLoading,
    error: optionsError,
    codeError: optionsCode,
  } = useEmployeeOptions(user?.nickname ?? "");

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

  if (isLoading || !isReady || employeeLoading || optionsLoading) {
    return <LoadingAppUI />;
  }
  if (
    hasError ||
    hasManagersError ||
    hasBusinessUnitError ||
    employeeError ||
    optionsError
  ) {
    return (
      <ErrorPage
        errorCode={
          BusinessManagersCode ??
          BusinessUnit ??
          employeeCode ??
          optionsCode ??
          1001
        }
      />
    );
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
        <RouterProvider router={router} />
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

export default App;
