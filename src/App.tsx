import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { AppPage } from "@components/layout/AppPage";
import { AppProvider, useAppContext } from "@context/AppContext";
import { enviroment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";

import { LoginRoutes } from "@routes/login";
import { usePortalData } from "@hooks/usePortalData";

import { GlobalStyles } from "@styles/global";

function LogOut() {
  const { logout } = useAuth0();

  const currentUrl = window.location.href;
  localStorage.setItem("lastUrl", currentUrl);

  localStorage.clear();
  logout({
    logoutParams: { returnTo: `${enviroment.REDIRECT_URI}?redirect=true` },
  });

  return <AppPage />;
}

function FirstPage() {
  const { businessUnitSigla } = useAppContext();
  return businessUnitSigla && businessUnitSigla.length === 0 ? (
    <ErrorPage />
  ) : (
    <AppPage />
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="welcome/*" element={<LoginRoutes />} />
      <Route path="/*" element={<FirstPage />} errorElement={<ErrorPage />} />
      <Route path="logout" element={<LogOut />} />
      <Route path="*" element={<ErrorPage />} />
    </>,
  ),
);

function App() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const [isReady, setIsReady] = useState(false);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const portalCode = params.get("portal");
  const { hasError } = usePortalData(portalCode ?? "");

  const shouldShowErrorPage = hasError || !portalCode;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    } else {
      const lastUrl = localStorage.getItem("lastUrl");
      if (lastUrl) {
        window.location.href = lastUrl;
      } else {
        setIsReady(true);
      }
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading || !isReady) {
    return null;
  }

  if (shouldShowErrorPage) {
    return <ErrorPage />;
  }

  return (
    <AppProvider>
      <GlobalStyles />
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
