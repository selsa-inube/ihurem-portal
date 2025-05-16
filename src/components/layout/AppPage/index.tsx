import { Outlet } from "react-router-dom";
import { Nav, Grid, Header, useMediaQuery, Stack } from "@inubekit/inubekit";

import {
  useNavConfig,
  userMenu,
  actions,
  useConfigHeader,
} from "@config/nav.config";
import { useAppContext } from "@context/AppContext/useAppContext";
import { spacing } from "@design/tokens/spacing/spacing";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledMainScroll,
} from "./styles";

interface AppPageProps {
  withNav?: boolean;
  withBanner?: boolean;
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
  const { withNav = true, withBanner = true } = props;
  const { user, logoUrl, selectedClient } = useAppContext();
  const isTablet = useMediaQuery("(max-width: 944px)");

  const navConfig = useNavConfig();
  const configHeader = useConfigHeader();

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          navigation={{ nav: configHeader, breakpoint: "800px" }}
          logoURL={renderLogo(
            selectedClient?.logo ?? logoUrl,
            selectedClient?.name ?? "Sin unidad seleccionada",
          )}
          user={{
            username: user?.username ?? "Nombre de usuario",
            client: selectedClient?.name ?? "Sin unidad seleccionada",
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
              <Nav navigation={navConfig} actions={actions} collapse={true} />
            )}
            <StyledMainScroll>
              <Stack width="100%">
                {withBanner && (
                  <Stack
                    padding={spacing.s075}
                    width="100%"
                    justifyContent="center"
                    margin={
                      isTablet
                        ? `${spacing.s0} ${spacing.s200}`
                        : `${spacing.s400} ${spacing.s800} ${spacing.s0} `
                    }
                  ></Stack>
                )}
              </Stack>
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
