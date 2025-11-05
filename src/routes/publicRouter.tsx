import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { useContractValidation } from "@hooks/useContractValidation";
import { ErrorPage } from "@components/layout/ErrorPage";
import { FirstPage } from "@pages/firstPage";
import { AppPage } from "@components/layout/AppPage";
import { ProtectedRoute } from "@pages/protectedRoute";
import { LogOut } from "@pages/logOut";

import { SelfRegistrationRoutes } from "./self-registration";
import { LoginRoutes } from "./login";
import { HolidaysRoutes } from "./holidays";
import { CertificationsRoutes } from "./certifications";
import { AbsencesRoutes } from "./absences";

function ContractValidationWrapper() {
  const { contracts, areAllContractsFinalized } = useContractValidation();

  if (contracts.length > 0 && areAllContractsFinalized) {
    return <ErrorPage errorCode={1000} />;
  }

  return <FirstPage />;
}

const protectedRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/self-registration" element={<SelfRegistrationRoutes />} />
      <Route path="/login/*" element={<LoginRoutes />} />

      <Route index element={<ContractValidationWrapper />} />
      <Route path="/" element={<ContractValidationWrapper />} />
      <Route path="/*" element={<AppPage />}>
        <Route
          path="holidays/*"
          element={
            <ProtectedRoute
              element={<HolidaysRoutes />}
              optionCode="vacations"
            />
          }
        />
        <Route
          path="certifications/*"
          element={
            <ProtectedRoute
              element={<CertificationsRoutes />}
              optionCode="certifications"
            />
          }
        />
        <Route
          path="disability/*"
          element={<ProtectedRoute element={<></>} optionCode="disability" />}
        />
        <Route
          path="absences/*"
          element={
            <ProtectedRoute
              element={<AbsencesRoutes />}
              optionCode="absences"
            />
          }
        />
        <Route
          path="*"
          element={<ProtectedRoute element={<></>} enforcePrivilegeCheck />}
        />
      </Route>

      <Route path="logout" element={<LogOut />} />
    </>,
  ),
);

export { protectedRouter };
