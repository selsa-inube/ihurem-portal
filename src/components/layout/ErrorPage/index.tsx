import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { Tag } from "@inubekit/tag";
import { useMediaQueries } from "@inubekit/hooks";
import { Divider } from "@inubekit/divider";

import { spacing } from "@design/tokens/spacing/spacing.ts";
import selsaLogo from "@assets/images/logoInube.png";
import errorImage from "@assets/images/img-team-building-68.png";

import {
  StyledCompanyLogo,
  StyledErrorImage,
  StyledFooter,
  StyledCertificationsContainer,
  VerticalDivider,
  StyledMainContent,
  StyledContainer,
} from "./styles";
import { environment } from "@config/environment.ts";
import errorCodes from "@config/errorCodes.tsx";

interface ErrorPageProps {
  logo?: string;
  logoAlt?: string;
  heading?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  nameButton?: string;
  onClick?: () => void;
  errorCode?: number;
}

function ErrorPage(props: ErrorPageProps) {
  const {
    logo = selsaLogo,
    logoAlt = "Sistemas Enlinea",
    heading = "¡Ups! Algo salió mal...",
    image = errorImage,
    imageAlt = "Ha surgido un error. Revisa la descripción",
    nameButton = "Regresar",
    onClick,
    errorCode = 0,
  } = props;

  const mediaQueries = ["(max-width: 600px)"];
  const matches = useMediaQueries(mediaQueries);
  const queriesMatches = matches["(max-width: 600px)"];

  const errorDetail = errorCodes[errorCode] || {
    whatWentWrong: (
      <ul>
        <li>No se proporcionó información sobre el error.</li>
      </ul>
    ),
    howToFix: (
      <ul>
        <li>Intenta nuevamente más tarde.</li>
      </ul>
    ),
  };

  return (
    <StyledContainer>
      <StyledMainContent>
        <Stack
          justifyContent="center"
          gap={queriesMatches ? spacing.s150 : spacing.s100}
        >
          <Stack
            gap={spacing.s600}
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
                <Tag
                  appearance="gray"
                  label={`Código de error: ${errorCode}`}
                  weight="strong"
                />
                <Text type="title" size="medium" appearance="gray">
                  {errorDetail.message}
                </Text>
                <StyledErrorImage
                  src={image}
                  alt={imageAlt}
                  width={queriesMatches ? "180px" : "256px"}
                  height={queriesMatches ? "160px" : "240px"}
                />
              </Stack>
            </Stack>

            <StyledCertificationsContainer $isMobile={queriesMatches}>
              <Stack
                direction={queriesMatches ? "column" : "row"}
                gap={spacing.s400}
                justifyContent="space-between"
                width="100%"
              >
                <Stack direction="column" gap={spacing.s300} width="100%">
                  <Text type="headline" size="medium" weight="bold">
                    ¿Qué salió mal?
                  </Text>
                  <Text type="title" size="medium" appearance="gray">
                    {errorDetail.whatWentWrong}
                  </Text>
                </Stack>

                <VerticalDivider $isVertical={!queriesMatches} />
                {queriesMatches && <Divider dashed />}

                <Stack direction="column" gap={spacing.s300} width="100%">
                  <Text type="headline" size="medium" weight="bold">
                    ¿Cómo solucionarlo?
                  </Text>
                  <Text type="title" size="medium" appearance="gray">
                    {errorDetail.howToFix}
                  </Text>
                  <Stack justifyContent="center">
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
            </StyledCertificationsContainer>
          </Stack>
        </Stack>
      </StyledMainContent>
      <StyledFooter>
        <Text appearance="gray" textAlign="center" size="small">
          © 2024 Inube
        </Text>
      </StyledFooter>
    </StyledContainer>
  );
}

export { ErrorPage };
export type { ErrorPageProps };
