import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { AppPage } from "@components/layout/AppPage";
import { AppProvider } from "@context/AppContext";
import { enviroment } from "@config/environment";
import { LoginRoutes } from "./routes/login";

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
      <Route path="/" element={<AppPage />} />
      <Route path="/welcome/*" element={<LoginRoutes />} />
      <Route path="logout" element={<LogOut />} />
    </>,
  ),
);

function App() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const location = window.location.pathname;

  useEffect(() => {
    if (!isLoading && !isAuthenticated && location !== "/welcome") {
      void loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, location]);

  if (!isAuthenticated && location !== "/welcome") {
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
