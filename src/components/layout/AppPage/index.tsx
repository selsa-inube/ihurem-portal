import { Outlet } from "react-router-dom";
import { Grid } from "@inubekit/grid";
import { Header } from "@inubekit/header";
import { Nav } from "@inubekit/nav";
import { useMediaQuery } from "@inubekit/hooks";

import { nav, userMenu, actions } from "@config/nav";
import { useAppContext } from "@context/AppContext";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
} from "./styles";

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function AppPage() {
  const { user, logoUrl, businessUnit, employeeOptions } = useAppContext();
  const isTablet = useMediaQuery("(max-width: 944px)");

  const businessUnitName = businessUnit?.businessUnit ?? "Unidad de Negocio";

  const filteredNav = {
    ...nav,
    sections: {
      administrate: {
        ...nav.sections.administrate,
        links: Object.fromEntries(
          Object.entries(nav.sections.administrate.links).filter(([, link]) => {
            const employeeOption = employeeOptions.find(
              (option) => option.abbreviatedName === link.label,
            );
            return !!employeeOption;
          }),
        ),
      },
    },
  };

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          portalId="portal"
          navigation={filteredNav}
          logoURL={renderLogo(logoUrl)}
          userName={user?.username ?? "Nombre de usuario"}
          userMenu={userMenu}
          client={businessUnitName}
        />
        <StyledContainer>
          <Grid
            templateColumns={!isTablet ? "auto 1fr" : "1fr"}
            alignContent="unset"
            height={"95vh"}
          >
            {!isTablet && (
              <Nav navigation={filteredNav} actions={actions} collapse={true} />
            )}
            <StyledMain $isTablet={isTablet}>
              <Outlet />
            </StyledMain>
          </Grid>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { AppPage };
