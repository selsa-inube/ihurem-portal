import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { AppPage } from "@components/layout/AppPage";
import { AppProvider, useAppContext } from "@context/AppContext";
import { decrypt } from "@utils/encrypt";
import { enviroment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";
import { useEmployeeByNickname } from "@src/hooks/useEmployeeInquiry";
import { GlobalStyles } from "@styles/global";
import { HolidaysRoutes } from "@routes/holidays";
import { LoginRoutes } from "@routes/login";
import { pathStart } from "@config/nav";
import { RegisterRoutes } from "@routes/register";
import { useAuth0 } from "@auth0/auth0-react";
import { useBusinessManagers } from "@hooks/useBusinessManagers";
import { useBusinessUnit } from "@hooks/useBusinessUnit";
import { usePortalData } from "@hooks/usePortalData";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
  return null;
}

function FirstPage() {
  const { user, provisionedPortal } = useAppContext();
  return (provisionedPortal?.portalCode &&
    provisionedPortal.portalCode.length === 0) ||
    !user ? (
    <LoginRoutes />
  ) : (
    <AppPage />
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="welcome/*" element={<LoginRoutes />} />
      <Route path="/*" element={<FirstPage />} errorElement={<ErrorPage />}>
        <Route path="holidays/*" element={<HolidaysRoutes />} />
      </Route>
      <Route path="logout" element={<LogOut />} />
      <Route path="/signin/*" element={<RegisterRoutes />} />
    </>,
  ),
);

function App() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const portalCode =
    params.get("portal") ??
    decrypt(localStorage.getItem("portalCode") as string);

  if (!portalCode) {
    return <ErrorPage />;
  }

  const [isReady, setIsReady] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  const { portalData, hasError } = usePortalData(portalCode ?? "");

  const { businessManagersData, hasError: hasManagersError } =
    useBusinessManagers(portalData);

  const { businessUnitData, hasError: hasBusinessUnitError } =
    useBusinessUnit(portalData);

  const {
    employee,
    loading: employeeLoading,
    error: employeeError,
  } = useEmployeeByNickname(user?.nickname ?? "");

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

  if (isLoading || !isReady || employeeLoading) {
    return null;
  }

  if (
    hasError ||
    hasManagersError ||
    hasBusinessUnitError ||
    employeeError ||
    !employee
  ) {
    return <ErrorPage />;
  }

  return (
    <AppProvider
      dataPortal={portalData}
      businessManagersData={businessManagersData}
      businessUnitData={businessUnitData}
      employeeData={employee}
    >
      <GlobalStyles />
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
