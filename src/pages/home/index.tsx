import { Text, Stack, Header } from "@inubekit/inubekit";

import { AppCard } from "@components/feedback/AppCard";
import { spacing } from "@design/tokens/spacing";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledQuickAccessContainer,
  StyledFooter,
  StyledFinalLogo,
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
  const {
    logoUrl,
    headerConfig,
    isTablet,
    quickAccess,
    Outlet,
    businessManagers,
  } = useHome();

  const finalLogo = businessManagers?.urlLogo ?? logoUrl;
  return (
    <StyledAppPage>
      <Header
        navigation={headerConfig.navigation}
        logoURL={renderLogo(headerConfig.logoURL.url, headerConfig.logoURL.alt)}
        user={headerConfig.user}
        menu={headerConfig.menu}
      />

      <StyledContainer>
        <StyledMain $isTablet={isTablet}>
          <Stack gap={spacing.s300} direction="column">
            <Text size={isTablet ? "medium" : "large"} type="headline">
              Bienvenido(a), {headerConfig.user?.username ?? "Usuario"}
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
                  description={link?.description ?? ""}
                  icon={link.icon}
                  url={link.path}
                />
              ))}
            </StyledQuickAccessContainer>
          </Stack>
          <Outlet />
        </StyledMain>
      </StyledContainer>

      <StyledFooter>
        <Stack alignItems="center" gap={spacing.s050}>
          <Text as="span" size="small" appearance="gray">
            ®
          </Text>
          <StyledFinalLogo src={finalLogo} />
        </Stack>
      </StyledFooter>
    </StyledAppPage>
  );
}

export { Home };
