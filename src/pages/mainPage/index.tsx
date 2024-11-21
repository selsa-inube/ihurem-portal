import { Outlet } from "react-router-dom";
import { Grid } from "@inubekit/grid";
import { Header } from "@inubekit/header";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { spacing } from "@design/tokens/spacing/spacing.ts";
import { Text } from "@inubekit/text";
import { AppCard } from "@components/feedback/AppCard";
import {
  MdOutlineBeachAccess,
  MdOutlinePersonOff,
  MdOutlineFilePresent,
  MdOutlinePersonalInjury,
} from "react-icons/md";

import { nav, userMenu } from "@config/nav";
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

function MainPage() {
  const { user, logoUrl } = useAppContext();
  const isTablet = useMediaQuery("(max-width: 944px)");

  const cards = [
    {
      title: "Vacaciones",
      complement: ["Solicita y organiza tus días libres fácilmente."],
      description: "Gestión de tus días de descanso.",
      icon: <MdOutlineBeachAccess />,
      url: "/holidays",
    },
    {
      title: "Ausencias",
      complement: ["Consulta tus ausencias registradas."],
      description: "Historial de tus ausencias laborales.",
      icon: <MdOutlinePersonOff />,
      url: "/ausencias",
    },
    {
      title: "Certificaciones",
      complement: ["Obtén tus certificaciones oficiales."],
      description: "Documentos oficiales disponibles.",
      icon: <MdOutlineFilePresent />,
      url: "/certificaciones",
    },
    {
      title: "Incapacidades",
      complement: ["Registra y consulta tus incapacidades."],
      description: "Gestión de permisos médicos.",
      icon: <MdOutlinePersonalInjury />,
      url: "/incapacidades",
    },
  ];

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          portalId="portal"
          navigation={nav}
          logoURL={renderLogo(logoUrl)}
          userName={user?.username ?? "Nombre de usuario"}
          userMenu={userMenu}
        />
        <StyledContainer>
          <StyledMain $isTablet={isTablet}>
            <Stack gap={spacing.s300} direction="column">
              <Text size="large" type="headline">
                Bienvenido(a), {user?.username ?? "Usuario"}
              </Text>
              <Text type="title" appearance="gray" size="large">
                Aquí tienes las funcionalidades disponibles.
              </Text>
              <Stack direction="row" gap="24px" wrap="wrap">
                {cards.map((card, index) => (
                  <AppCard
                    key={index}
                    title={card.title}
                    complement={card.complement}
                    description={card.description}
                    icon={card.icon}
                    url={card.url}
                  />
                ))}
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

export { MainPage };
