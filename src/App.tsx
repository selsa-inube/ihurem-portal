import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { AppPage } from "@components/layout/AppPage";
import { Home } from "@src/pages/Home";
import { AppProvider, useAppContext } from "@context/AppContext";
import { decrypt } from "@utils/encrypt";
import { environment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";
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
  logout({ logoutParams: { returnTo: environment.REDIRECT_URI } });
  return <Home />;
}

function FirstPage() {
  const { user } = useAppContext();
  const portalCode = localStorage.getItem("portalCode");

  if (!user || !portalCode || portalCode.length === 0) {
    return <LoginRoutes />;
  }

  return <Home />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="welcome/*" element={<LoginRoutes />} />
      <Route path="/*" element={<FirstPage />} errorElement={<ErrorPage />} />
      <Route path="/*" element={<AppPage />}>
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
  const portalCode = params.get("portal")
    ? params.get("portal")
    : decrypt(localStorage.getItem("portalCode") as string);

  if (!portalCode) {
    return <ErrorPage />;
  }

  const [isReady, setIsReady] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const { portalData, hasError } = usePortalData(portalCode ?? "");

  const { businessManagersData, hasError: hasManagersError } =
    useBusinessManagers(portalData);

  const { businessUnitData, hasError: hasBusinessUnitError } =
    useBusinessUnit(portalData);

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

  if (isLoading || !isReady) {
    return null;
  }

  if (hasError || hasManagersError || hasBusinessUnitError) {
    return <ErrorPage />;
  }

  return (
    <AppProvider
      dataPortal={portalData}
      businessManagersData={businessManagersData}
      businessUnitData={businessUnitData}
    >
      <GlobalStyles />
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
