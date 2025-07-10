import { Grid, useMediaQueries, Stack, Text } from "@inubekit/inubekit";

import selsa from "@assets/images/selsa.png";
import teamSuccess from "@assets/images/teamSuccess.png";
import { spacing } from "@design/tokens/spacing";

import {
  StyledWelcomeContainer,
  StyledOutletContainer,
  StyledImg,
  StyledLogo,
} from "./styles";
import { RegistrationForm } from "./RegistrationForm";

function SelfRegistrationUI() {
  const { "(max-width: 768px)": screenMobile }: Record<string, boolean> =
    useMediaQueries(["(max-width: 768px)"]);

  return (
    <Grid
      templateColumns={screenMobile ? "1fr" : "repeat(2, 1fr)"}
      templateRows={screenMobile ? "minmax(360px, 47vh) 1fr" : "100vh"}
    >
      <StyledWelcomeContainer>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          height={screenMobile ? "auto" : "100%"}
        >
          <Stack
            direction="column"
            alignItems="center"
            gap={screenMobile ? spacing.s250 : spacing.s400}
          >
            <StyledLogo src={selsa} alt="logo selsa" />
            <Stack direction="column" alignItems="center">
              <Text type="headline" size="small" weight="bold">
                ¡Bienvenido!
              </Text>
              <Text
                as="h1"
                type="headline"
                size={screenMobile ? "medium" : "large"}
              >
                Portal de empleados
              </Text>
            </Stack>
            <StyledImg
              src={teamSuccess}
              $screenMobile={screenMobile}
              alt="team success img"
            />
          </Stack>
        </Stack>
      </StyledWelcomeContainer>
      <StyledOutletContainer>
        <Stack
          alignItems={screenMobile ? "flex-start" : "center"}
          justifyContent="center"
          height="-webkit-fill-available"
          padding={`${spacing.s400} ${spacing.s300} ${spacing.s0}`}
        >
          <RegistrationForm />
        </Stack>
      </StyledOutletContainer>
    </Grid>
  );
}

export { SelfRegistrationUI };
