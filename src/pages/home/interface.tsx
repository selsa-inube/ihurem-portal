import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { userMenu, useConfigHeader, navConfig } from "@config/nav.config";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useEmployeeOptions } from "@hooks/useEmployeeOptions";

export const useHome = () => {
  const { user, logoUrl, businessUnit, employees, businessManagers } =
    useAppContext();
  const { data: employeeOptions } = useEmployeeOptions(user?.id ?? "");

  const safeEmployeeOptions = employeeOptions ?? [];

  const configHeader = useConfigHeader(safeEmployeeOptions);
  const isTablet = useMediaQuery("(max-width: 944px)");

  const headerConfig = {
    navigation: { nav: configHeader, breakpoint: "800px" },
    logoURL: {
      url: businessUnit?.urlLogo ?? logoUrl,
      alt: businessUnit?.abbreviatedName ?? "Sin unidad seleccionada",
    },
    user: {
      username: employees
        ? `${employees.names} ${employees.surnames}`
        : (user?.username ?? "Nombre de usuario"),
      client: businessUnit?.abbreviatedName ?? "Sin unidad seleccionada",
      breakpoint: "800px",
    },
    menu: userMenu,
  };

  const quickAccess = navConfig(safeEmployeeOptions);

  return {
    user,
    logoUrl,
    headerConfig,
    isTablet,
    quickAccess,
    Outlet,
    businessManagers,
  };
};
