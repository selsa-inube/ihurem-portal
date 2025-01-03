import { Outlet } from "react-router-dom";
import { Text } from "@inubekit/text";
import { Grid } from "@inubekit/grid";
import { Header } from "@inubekit/header";
import { Stack } from "@inubekit/stack";
import { useMediaQueries } from "@inubekit/hooks";

import { AppCard } from "@components/feedback/AppCard";
import { spacing } from "@design/tokens/spacing/spacing.ts";
import { userMenu, nav } from "@config/nav.config";
import { useAppContext } from "@context/AppContext";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledFooter,
} from "./styles";

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function Home() {
  const { user, logoUrl, employeeOptions } = useAppContext();
  const mediaQueries = useMediaQueries([
    "(max-width: 944px)",
    "(max-width: 690px)",
  ]);

  const isTablet = mediaQueries["(max-width: 944px)"];
  const isMobile = mediaQueries["(max-width: 690px)"];

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          portalId="portal"
          logoURL={renderLogo(logoUrl)}
          userName={user?.username ?? "Nombre de usuario"}
          userMenu={userMenu}
        />
        <StyledContainer>
          <StyledMain $isTablet={isTablet}>
            <Stack gap={spacing.s300} direction="column">
              <Text size={isMobile ? "medium" : "large"} type="headline">
                Bienvenido(a), {user?.username ?? "Usuario"}
              </Text>
              <Text
                type="title"
                appearance="gray"
                size={isMobile ? "medium" : "large"}
              >
                Aquí tienes las funcionalidades disponibles.
              </Text>
              <Stack
                direction={isMobile ? "column" : "row"}
                gap={isMobile ? spacing.s200 : spacing.s300}
                wrap="wrap"
                justifyContent={isMobile ? "center" : "flex-start"}
                alignItems={isMobile ? "center" : "flex-start"}
              >
                {Object.values(nav.sections.administrate.links).map(
                  (link, index) => {
                    const employeeOption = employeeOptions.find(
                      (option) => option.abbreviatedName === link.label,
                    );
                    return (
                      employeeOption && (
                        <AppCard
                          key={index}
                          title={employeeOption.abbreviatedName}
                          complement={[]}
                          description={employeeOption.descriptionUse}
                          icon={link.icon}
                          url={link.path}
                        />
                      )
                    );
                  },
                )}
              </Stack>
            </Stack>
            <Outlet />
            <StyledFooter>
              <Text appearance="gray" textAlign="center" size="medium">
                © 2024 Inube
              </Text>
            </StyledFooter>
          </StyledMain>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { Home };
