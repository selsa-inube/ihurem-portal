import { Text, Stack, Grid, Header } from "@inubekit/inubekit";

import { AppCard } from "@components/feedback/AppCard";
import { spacing } from "@design/tokens/spacing";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledQuickAccessContainer,
} from "./styles";
import { useHome } from "./interface";

const renderLogo = (imgUrl: string, altText: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} alt={altText} />
    </StyledContentImg>
  );
};

function Home() {
  const { user, headerConfig, isTablet, quickAccess, Outlet } = useHome();

  return (
    <StyledAppPage>
      <Grid templateRows="auto auto" height="100vh" justifyContent="unset">
        <Header
          navigation={headerConfig.navigation}
          logoURL={renderLogo(
            headerConfig.logoURL.url,
            headerConfig.logoURL.alt,
          )}
          user={headerConfig.user}
          menu={headerConfig.menu}
        />
        <StyledContainer>
          <StyledMain $isTablet={isTablet}>
            <Grid
              templateColumns={isTablet ? "1fr" : "auto 1fr"}
              alignItems="start"
            >
              <Stack gap={spacing.s300} direction="column">
                <Text size={isTablet ? "medium" : "large"} type="headline">
                  Bienvenido(a), {user?.username ?? "Usuario"}
                </Text>
                <Text
                  type="title"
                  appearance="gray"
                  size={isTablet ? "medium" : "large"}
                >
                  Aquí tienes las funcionalidades disponibles.
                </Text>
                <StyledQuickAccessContainer $isTablet={isTablet}>
                  {quickAccess.map((link, index) => (
                    <AppCard
                      key={index}
                      title={link.label}
                      description={link.description}
                      icon={link.icon}
                      url={link.path}
                    />
                  ))}
                </StyledQuickAccessContainer>
              </Stack>
            </Grid>
            <Outlet />
          </StyledMain>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { Home };
