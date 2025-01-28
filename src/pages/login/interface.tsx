import { Outlet } from "react-router-dom";
import { Text, Grid, Stack, useMediaQueries } from "@inubekit/inubekit";

import selsaLogo from "@assets/images/team-success-5-66 1.png";

import { StyledWelcomeContainer, StyledOutletContainer } from "./styles";

function LoginUI() {
  const { "(max-width: 768px)": screenMobile } = useMediaQueries([
    "(max-width: 768px)",
  ]);

  return (
    <Grid
      templateColumns={screenMobile ? "1fr" : "repeat(2, 1fr)"}
      templateRows={screenMobile ? "minmax(10px, 45vh) 1fr" : "100vh"}
    >
      <StyledWelcomeContainer>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          gap={screenMobile ? "16px" : "32px"}
        >
          <Stack direction="column" alignItems="center">
            <Text type="headline" size="small" textAlign="center" weight="bold">
              ¡Bienvenido!
            </Text>
            <Text as="h1" type="headline" size="large">
              Portal de empleados
            </Text>
            <img
              src={selsaLogo}
              alt="Logo de Selsa"
              style={{
                width: screenMobile ? "189px" : "278px",
                maxWidth: screenMobile ? "191px" : "281px",
              }}
            />
          </Stack>
        </Stack>
      </StyledWelcomeContainer>
      <StyledOutletContainer>
        <Stack
          alignItems="center"
          justifyContent="center"
          height={screenMobile ? "37vh" : "-webkit-fill-available"}
          padding="32px 16px"
        >
          <Outlet />
        </Stack>
      </StyledOutletContainer>
    </Grid>
  );
}

export { LoginUI };
