import { Outlet } from "react-router-dom";
import { useMediaQueries } from "@inubekit/hooks";
import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import selsaLogo from "@assets/images/team-success-5-66 1.png";

import { StyledWelcomeContainer, StyledOutletContainer } from "./styles";

function LoginUI() {
  const { "(max-width: 768px)": screenMobile }: { [key: string]: boolean } =
    useMediaQueries(["(max-width: 768px)"]);

  return (
    <Grid
      templateColumns={screenMobile ? "1fr" : "repeat(2, 1fr)"}
      templateRows={screenMobile ? "minmax(150px, 20vh) 1fr" : "100vh"}
    >
      <StyledWelcomeContainer>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          gap={screenMobile ? "16px" : "32px"}
        >
          <Stack direction="column">
            <Text type="headline" size="small" textAlign="center">
              ¡Bienvenido!
            </Text>
            <Text as="h1" type="headline" size="large">
              Portal de empleados
            </Text>
            <img
              src={selsaLogo}
              alt="Logo de Selsa"
              style={{ width: "278px", maxWidth: "281px", marginTop: "16px" }}
            />
          </Stack>
        </Stack>
      </StyledWelcomeContainer>
      <StyledOutletContainer>
        <Stack
          alignItems="center"
          justifyContent="center"
          height={screenMobile ? "70vh" : "-webkit-fill-available"}
          padding="32px 16px"
        >
          <Outlet />
        </Stack>
      </StyledOutletContainer>
    </Grid>
  );
}

export { LoginUI };
