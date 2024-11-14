import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AppPage } from "@components/layout/AppPage";
import { AppProvider, useAppContext } from "@context/AppContext";
import { enviroment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";
import { LoginRoutes } from "./routes/login";
import { usePortalData } from "./hooks/usePortalData";
import { pathStart } from "@config/nav.tsx";
import { GlobalStyles } from "./styles/global";
import { useEffect, useState } from "react";
import { decrypt } from "@utils/encrypt";

function LogOut() {
  const { logout } = useAuth0();
  localStorage.clear();
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
      <Route path="*" element={<ErrorPage />} />
    </>,
  ),
);

function App() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const location = window.location.pathname;

  const [isError, setIsError] = useState(false);
  const [isPortalValid, setIsPortalValid] = useState(true);

  useEffect(() => {
    const portalFromUrl = params.get("portal");
    const portalFromLocalStorage = decrypt(
      localStorage.getItem("portalCode") as string,
    );

    if (!portalFromUrl || portalFromUrl !== "ihurem") {
      setIsPortalValid(false);
      setIsError(true);
      return;
    }

    if (portalFromLocalStorage && portalFromLocalStorage !== "ihurem") {
      setIsPortalValid(false);
      setIsError(true);
      return;
    }

    setIsError(false);
  }, [params]);

  const { hasError: portalError } = usePortalData(params.get("portal") ?? "");

  const shouldShowErrorPage = isError || portalError || !isPortalValid;

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !pathStart.includes(location)) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, location]);

  if (shouldShowErrorPage) {
    return <ErrorPage />;
  }

  if (!isAuthenticated && !pathStart.includes(location)) {
    return null;
  }

  return (
    <AppProvider>
      <GlobalStyles />
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
