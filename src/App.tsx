import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { AppPage } from "@components/layout/AppPage";
import { AppProvider } from "@context/AppContext";
import { enviroment } from "@config/environment";
import { ErrorPage } from "@components/layout/ErrorPage";

import { Login } from "@pages/login";
import { LoginRoutes } from "./routes/login";
import { usePortalData } from "./hooks/usePortalData";
import { useBusinessManagers } from "./hooks/useBusinessManagers";
import { useAppContext } from "@context/AppContext";
import { useAuthRedirect } from "./hooks/useAuthRedirect";

import { GlobalStyles } from "./styles/global";

function LogOut() {
  const { logout } = useAuth0();
  localStorage.clear();
  logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
  return null;
}

function FirstPage() {
  const { businessUnitSigla } = useAppContext();
  return businessUnitSigla && businessUnitSigla.length === 0 ? (
    <Login />
  ) : (
    <ErrorPage />
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<FirstPage />} errorElement={<ErrorPage />} />
      <Route path="/" element={<AppPage />} />
      <Route path="welcome/*" element={<LoginRoutes />} />
      <Route path="logout" element={<LogOut />} />
    </>,
  ),
);

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const portalCode = params.get("portal");

function App() {
  const { portalData, hasError: portalError } = usePortalData();
  const { businessManagersData, hasError: businessError } = useBusinessManagers(
    portalData,
    portalCode,
  );
  const {
    hasError: authError,
    isLoading,
    isAuthenticated,
  } = useAuthRedirect(portalData, businessManagersData, portalCode);

  const hasError = portalError || businessError || authError;

  if (isLoading) {
    return null;
  }

  if (hasError && !isAuthenticated) {
    return <ErrorPage />;
  }

  if (!isAuthenticated) {
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
