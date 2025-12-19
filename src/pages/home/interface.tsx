import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { userMenu, useConfigHeader, navConfig } from "@config/nav.config";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useEmployeeOptions } from "@hooks/useEmployeeOptions";
import { capitalizeWords } from "@utils/texts";

export const useHome = () => {
  const { user, logoUrl, businessUnit, employees, businessManagers } =
    useAppContext();
  const { data: employeeOptions } = useEmployeeOptions(
    user?.id ?? "",
    businessUnit?.publicCode ?? "",
  );

  const safeEmployeeOptions = employeeOptions ?? [];

  const configHeader = useConfigHeader(safeEmployeeOptions);
  const isTablet = useMediaQuery("(max-width: 944px)");

  const headerConfig = {
    navigation: { nav: configHeader, breakpoint: "800px" },
    logoURL: {
      url: businessUnit?.urlLogo ?? logoUrl,
      alt:
        businessUnit?.abbreviatedName ??
        labels.home.placeholders.noBusinessUnit,
    },
    user: {
      username: employees
        ? `${capitalizeWords(employees.names)} ${capitalizeWords(employees.surnames)}`
        : (user?.username ?? "Nombre de usuario"),
      client:
        businessUnit?.abbreviatedName ??
        labels.home.placeholders.noBusinessUnit,
      breakpoint: "800px",
    },
    menu: userMenu,
  };

  const quickAccess = navConfig(safeEmployeeOptions);

  return {
    logoUrl,
    headerConfig,
    isTablet,
    quickAccess,
    Outlet,
    businessManagers,
  };
};
