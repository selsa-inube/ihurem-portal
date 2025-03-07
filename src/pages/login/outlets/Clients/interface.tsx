import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Text, Stack, Button } from "@inubekit/inubekit";

import selsaLogo from "@assets/images/logoInube.png";
import { StyledClients } from "./styles";

function ClientsUI() {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    const portalCode = new URLSearchParams(window.location.search).get(
      "portal",
    );

    loginWithRedirect({
      authorizationParams: {
        connection: "google-oauth2",
      },
      appState: {
        returnTo: portalCode ? `/?portal=${portalCode}` : "/",
      },
    }).catch((error) => {
      console.error("Error al intentar iniciar sesión:", error);
    });
  };

  const handleRegisterClick = () => {
    navigate("/signin");
  };

  return (
    <StyledClients>
      <Stack direction="column">
        <Stack
          justifyContent="center"
          direction="column"
          alignItems="center"
          gap="32px"
        >
          <img
            src={selsaLogo}
            alt="Logo de Selsa"
            style={{ width: "54px", maxWidth: "54px" }}
          />

          <Text type="headline" size="large" textAlign="center">
            Acceder
          </Text>

          <Text size="large" textAlign="center">
            Con el <strong> portal de empleados </strong>puedes gestionar tus
            solicitudes de forma autónoma.
          </Text>
        </Stack>
        <Stack gap="24px" direction="column" alignItems="center">
          <Button onClick={() => handleLoginClick()}>Inicia sesión</Button>
          <Stack gap="12px">
            <Text
              type="body"
              size="medium"
              textAlign="center"
              appearance="gray"
            >
              ¿Aún no estás registrado/a?
            </Text>
            <Text
              type="body"
              size="medium"
              textAlign="center"
              appearance="primary"
              parentHover
              onClick={handleRegisterClick}
            >
              ¡Regístrate!
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </StyledClients>
  );
}

export { ClientsUI };
