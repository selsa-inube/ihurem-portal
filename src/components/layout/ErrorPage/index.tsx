import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";

import selsaLogo from "@assets/images/logoInube.png";
import errorImage from "@assets/images/img-team-building-68.png";

import { StyledCompanyLogo, StyledErrorImage } from "./styles";

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
    description = "No estás registrado(a) o las atribuciones utilizadas no corresponden con las registradas.",
    image = errorImage,
    imageAlt = "Ha surgido un error. Revisa la descripción",
    nameButton = "Regresar",
    onClick,
  } = props;

  return (
    <Stack padding="20px" gap="64px" direction="column" alignItems="center">
      <Stack direction="row" justifyContent="start" width="100%">
        <StyledCompanyLogo
          src={logo}
          alt={logoAlt}
          width="54px"
          height="54px"
        />
      </Stack>

      <Grid
        templateRows="auto"
        templateColumns="1fr"
        alignItems="center"
        gap="28px"
      >
        <Stack
          direction="column"
          alignItems="center"
          gap="30px"
          padding="50px 0px"
        >
          <Text type="headline" textAlign="center" weight="bold" size="large">
            {heading}
          </Text>
          <StyledErrorImage
            src={image}
            alt={imageAlt}
            width="256px"
            height="240px"
          />
        </Stack>

        <Stack gap="24px" direction="column" alignItems="center">
          <Text type="title" size="medium" textAlign="center">
            {description}
          </Text>
          <Button onClick={onClick}>{nameButton}</Button>
        </Stack>
      </Grid>
    </Stack>
  );
}

export { ErrorPage };
export type { ErrorPageProps };
