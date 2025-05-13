import { Outlet } from "react-router-dom";
import { Grid, Header, Nav, useMediaQuery } from "@inubekit/inubekit";

import { nav, userMenu, actions } from "@config/nav.config";
import { useAppContext } from "@context/AppContext/useAppContext";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledMainScroll,
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

  const businessUnitName = businessUnit?.abbreviatedName ?? "Unidad de Negocio";

  const availableTitles = employeeOptions.map((option) =>
    option.abbreviatedName.trim().toLowerCase(),
  );

  const filteredLinks = Object.fromEntries(
    Object.entries(nav.sections.administrate.links).filter(([, link]) =>
      availableTitles.includes(link.label.trim().toLowerCase()),
    ),
  );

  const headerNav = {
    ...nav,
    reactPortalId: "portal",
    sections: [
      {
        ...nav.sections.administrate,
        subtitle: "Administración",
        links: Object.values(filteredLinks),
      },
    ],
  };

  const sidebarNav = {
    ...nav,
    sections: {
      administrate: {
        ...nav.sections.administrate,
        links: filteredLinks,
      },
    },
  };

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          navigation={{
            nav: headerNav,
          }}
          logoURL={renderLogo(logoUrl)}
          user={{
            username: user?.username ?? "Nombre de usuario",
            client: businessUnitName,
          }}
          menu={userMenu}
        />
        <StyledContainer>
          <Grid
            templateColumns={!isTablet ? "auto 1fr" : "1fr"}
            alignContent="unset"
            height={"95vh"}
          >
            {!isTablet && (
              <Nav navigation={sidebarNav} actions={actions} collapse={true} />
            )}
            <StyledMainScroll>
              <StyledMain>
                <Outlet />
              </StyledMain>
            </StyledMainScroll>
          </Grid>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { AppPage };
