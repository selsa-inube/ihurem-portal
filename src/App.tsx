import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { AppPage } from "@components/layout/AppPage";
import { ErrorPage } from "@components/layout/ErrorPage";
import { AppProvider } from "@context/AppContext";
import { enviroment } from "@config/environment";
import { pathStart } from "@config/nav.tsx";

import { HolidaysRoutes } from "./routes/holidays";
import { LoginRoutes } from "./routes/login";
import { RegisterRoutes } from "./routes/register";
import { GlobalStyles } from "./styles/global";

function LogOut() {
  localStorage.clear();
  const { logout } = useAuth0();
  void logout({ logoutParams: { returnTo: enviroment.REDIRECT_URI } });
  return <AppPage />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppPage />} errorElement={<ErrorPage />}>
        <Route path="holidays/*" element={<HolidaysRoutes />} />
      </Route>
      <Route path="/welcome/*" element={<LoginRoutes />} />
      <Route path="/signin/*" element={<RegisterRoutes />} />
      <Route path="logout" element={<LogOut />} />
    </>,
  ),
);

function App() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const location = window.location.pathname;

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !pathStart.includes(location)) {
      void loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, location]);

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
