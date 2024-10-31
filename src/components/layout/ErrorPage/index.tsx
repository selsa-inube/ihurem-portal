import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { useMediaQueries } from "@inubekit/hooks"; // Asegúrate de tener este hook disponible

import selsaLogo from "@assets/images/logoInube.png";
import errorImage from "@assets/images/img-team-building-68.png";

import { StyledCompanyLogo, StyledErrorImage, StyledFooter } from "./styles";

interface ErrorPageProps {
  logo?: string;
  logoAlt?: string;
  heading?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  nameButton?: string;
  onClick?: () => void;
}

function ErrorPage(props: ErrorPageProps) {
  const {
    logo = selsaLogo,
    logoAlt = "Sistemas Enlinea",
    heading = "¡Ups! Algo salió mal...",
    description = "La compañía donde trabajas NO tiene los privilegios requeridos para acceder al portal.Confirma que estés usando la url adecuada",
    image = errorImage,
    imageAlt = "Ha surgido un error. Revisa la descripción",
    nameButton = "Regresar",
    onClick,
  } = props;

  const mediaQueries = ["(max-width: 600px)"];
  const matches = useMediaQueries(mediaQueries);

  return (
    <Stack
      padding={matches["(max-width: 600px)"] ? "20px" : "20px"}
      gap={matches["(max-width: 600px)"] ? "10px" : "64px"}
      direction="column"
      alignItems="center"
    >
      <Stack direction="row" justifyContent="start" width="100%">
        <StyledCompanyLogo
          src={logo}
          alt={logoAlt}
          width={matches["(max-width: 600px)"] ? "40px" : "54px"}
          height={matches["(max-width: 600px)"] ? "40px" : "54px"}
        />
      </Stack>

      <Grid
        templateRows="auto"
        templateColumns="1fr"
        alignItems="center"
        gap={matches["(max-width: 600px)"] ? "28px" : "28px"}
      >
        <Stack
          direction="column"
          alignItems="center"
          gap={matches["(max-width: 600px)"] ? "24px" : "30px"}
          padding={matches["(max-width: 600px)"] ? "90px 0px" : "50px 0px"}
        >
          <Text
            type="headline"
            textAlign="center"
            weight="bold"
            size={matches["(max-width: 600px)"] ? "medium" : "large"}
          >
            {heading}
          </Text>
          <StyledErrorImage
            src={image}
            alt={imageAlt}
            width={matches["(max-width: 600px)"] ? "180px" : "256px"}
            height={matches["(max-width: 600px)"] ? "160px" : "240px"}
          />
        </Stack>

        <Stack gap="24px" direction="column" alignItems="center">
          <Text type="title" size="medium" textAlign="center" appearance="gray">
            {description}
          </Text>
          <Button
            onClick={() =>
              onClick
                ? onClick()
                : window.open("https://www.google.com", "_blank")
            }
          >
            {nameButton}
          </Button>
        </Stack>
      </Grid>

      <StyledFooter>
        <Text appearance="gray" textAlign="center" size="small">
          © 2024 Inube
        </Text>
      </StyledFooter>
    </Stack>
  );
}

export { ErrorPage };
export type { ErrorPageProps };
