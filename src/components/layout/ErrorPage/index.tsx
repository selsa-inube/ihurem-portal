import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { useMediaQueries } from "@inubekit/hooks";

import { spacing } from "@design/tokens/spacing/spacing.ts";
import selsaLogo from "@assets/images/logoInube.png";
import errorImage from "@assets/images/img-team-building-68.png";

import { StyledCompanyLogo, StyledErrorImage, StyledFooter } from "./styles";
import { environment } from "@config/environment.ts";

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
    description = "",
    image = errorImage,
    imageAlt = "Ha surgido un error. Revisa la descripción",
    nameButton = "Regresar",
    onClick,
  } = props;

  const mediaQueries = ["(max-width: 600px)"];
  const matches = useMediaQueries(mediaQueries);

  const queriesMatches = matches["(max-width: 600px)"];

  return (
    <Stack
      padding={
        queriesMatches ? `${spacing.s500} ${spacing.s250}` : spacing.s1000
      }
      justifyContent="center"
      gap={queriesMatches ? spacing.s150 : spacing.s100}
    >
      <Stack
        gap={spacing.s800}
        direction="column"
        alignItems="center"
        width="100%"
      >
        <Stack direction="row" justifyContent="start" width="100%">
          <StyledCompanyLogo
            src={logo}
            alt={logoAlt}
            width={queriesMatches ? "40px" : "54px"}
            height={queriesMatches ? "40px" : "54px"}
          />
        </Stack>

        <Stack direction="column" alignItems="center" gap={spacing.s350}>
          <Stack
            direction="column"
            alignItems="center"
            gap={queriesMatches ? spacing.s300 : spacing.s400}
          >
            <Text
              type="headline"
              textAlign="center"
              weight="bold"
              size={queriesMatches ? "small" : "large"}
            >
              {heading}
            </Text>
            <StyledErrorImage
              src={image}
              alt={imageAlt}
              width={queriesMatches ? "180px" : "256px"}
              height={queriesMatches ? "160px" : "240px"}
            />
          </Stack>

          <Stack
            gap="24px"
            direction="column"
            alignItems="center"
            justifyContent="center"
            width="80%"
          >
            <Text
              type="title"
              size={queriesMatches ? "small" : "large"}
              textAlign="center"
              appearance="gray"
            >
              {description}
            </Text>
            <Button
              appearance="primary"
              spacing="wide"
              variant="filled"
              onClick={() =>
                onClick
                  ? onClick()
                  : window.open(environment.REDIRECT_URI, "_self")
              }
            >
              {nameButton}
            </Button>
          </Stack>
        </Stack>
      </Stack>
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
