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
import { RegisterRoutes } from "./routes/register";

import { GlobalStyles } from "@styles/global";
import { pathStart } from "./config/nav";
import { decrypt } from "./utils/encrypt";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
  return null;
}
function FirstPage() {
  const { user } = useAppContext();
  const portalCode = localStorage.getItem("portalCode");
  return (portalCode && portalCode.length === 0) || !user ? (
    <LoginRoutes />
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

  const { hasError } = usePortalData(portalCode ?? "");

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

  if (hasError) {
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
