import { Outlet } from "react-router-dom";
import { Nav, Grid, Header, useMediaQuery } from "@inubekit/inubekit";

import {
  useNavConfig,
  userMenu,
  actions,
  useConfigHeader,
} from "@config/nav.config";
import { useEmployeeOptions } from "@hooks/useEmployeeOptions";
import { useSignOut } from "@hooks/useSignOut";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useContractValidation } from "@hooks/useContractValidation";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledMainScroll,
  StyledFinalLogo,
  StyledFooter,
} from "./styles";

interface AppPageProps {
  withNav?: boolean;
}

const renderLogo = (imgUrl: string, clientName: string) => {
  return imgUrl ? (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} alt={clientName} />
    </StyledContentImg>
  ) : (
    <StyledContentImg to="/">{clientName}</StyledContentImg>
  );
};

function AppPage(props: AppPageProps) {
  const { withNav = true } = props;
  const {
    user,
    logoUrl,
    employees,
    businessUnit,
    isLoadingUser,
    businessManagers,
  } = useAppContext();
  const isTablet = useMediaQuery("(max-width: 944px)");
  const { signOut } = useSignOut();

  const { data: employeeOptions } = useEmployeeOptions(user?.id ?? "");
  if (employeeOptions && employeeOptions.length === 0) {
    signOut(`/error?code=1005`);
    return null;
  }

  const safeEmployeeOptions = employeeOptions ?? [];

  const navConfig = useNavConfig(safeEmployeeOptions);

  const configHeader = useConfigHeader(safeEmployeeOptions);

  const finalLogo = businessManagers?.urlLogo ?? logoUrl;

  useContractValidation();

  if (isLoadingUser) {
    return <LoadingAppUI />;
  }

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          navigation={{ nav: configHeader, breakpoint: "800px" }}
          logoURL={renderLogo(
            businessUnit?.urlLogo ?? logoUrl,
            businessUnit?.abbreviatedName ?? "Sin unidad seleccionada",
          )}
          user={{
            username: employees
              ? `${employees.names} ${employees.surnames}`
              : (user?.username ?? "Nombre de usuario"),
            client: businessUnit?.abbreviatedName ?? "Sin unidad seleccionada",
            breakpoint: "800px",
          }}
          menu={userMenu}
        />
        <StyledContainer>
          <Grid
            templateColumns={withNav && !isTablet ? "auto 1fr" : "1fr"}
            alignContent="unset"
            height="95vh"
          >
            {withNav && !isTablet && (
              <Nav
                navigation={navConfig}
                actions={actions}
                collapse={true}
                footerLogo={finalLogo}
              />
            )}
            <StyledMainScroll>
              <StyledMain>
                <Outlet />
              </StyledMain>
              {isTablet && finalLogo && (
                <StyledFooter>
                  <StyledFinalLogo src={finalLogo} />
                </StyledFooter>
              )}
            </StyledMainScroll>
          </Grid>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { AppPage };
