import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Home } from "@src/pages/home";
import { decrypt } from "@utils/encrypt";
import { LoginRoutes } from "@routes/login";
import { GlobalStyles } from "@styles/global";
import { pathStart } from "@config/nav.config";
import { environment } from "@config/environment";
import { HolidaysRoutes } from "@routes/holidays";
import { RegisterRoutes } from "@routes/register";
import { AppPage } from "@components/layout/AppPage";
import { usePortalData } from "@hooks/usePortalData";
import { ErrorPage } from "@components/layout/ErrorPage";
import { useBusinessUnit } from "@hooks/useBusinessUnit";
import { CertificationsRoutes } from "@routes/certifications";
import { useEmployeeOptions } from "@hooks/useEmployeeOptions";
import { AppProvider, useAppContext } from "@context/AppContext";
import { useBusinessManagers } from "@hooks/useBusinessManagers";
import { useEmployeeByNickname } from "@src/hooks/useEmployeeInquiry";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: environment.REDIRECT_URI } });
  return <Home />;
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="welcome/*" element={<LoginRoutes />} />
      <Route path="/*" element={<FirstPage />} errorElement={<ErrorPage />} />
      <Route path="/*" element={<AppPage />}>
        <Route path="holidays/*" element={<HolidaysRoutes />} />
        <Route path="certifications/*" element={<CertificationsRoutes />} />
      </Route>
      <Route path="logout" element={<LogOut />} />
      <Route path="/signin/*" element={<RegisterRoutes />} />
    </>,
  ),
);

function App() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalCode = params.get("portal")
    ? params.get("portal")
    : decrypt(localStorage.getItem("portalCode") as string);

  if (!portalCode) {
    return <ErrorPage errorCode={1000} />;
  }

  const [isReady, setIsReady] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
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

  const {
    employee,
    loading: employeeLoading,
    error: employeeError,
    codeError: employeeCode,
  } = useEmployeeByNickname(user?.nickname ?? "");

  const {
    data: employeeOptions,
    loading: optionsLoading,
    error: optionsError,
    codeError: optionsCode,
  } = useEmployeeOptions(user?.nickname ?? "");

  useEffect(() => {
    if (
      !isLoading &&
      !isAuthenticated &&
      !hasError &&
      !pathStart.includes(window.location.pathname)
    ) {
      loginWithRedirect();
    } else {
      setIsReady(true);
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading || !isReady || employeeLoading || optionsLoading) {
    return <div>Cargando....</div>;
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
  );
}

export default App;
