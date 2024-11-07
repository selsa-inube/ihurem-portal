import { Button } from "@inubekit/button";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { Input } from "@inubekit/input";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import selsaLogo from "@assets/images/logoInube.png";
import { StyledClients } from "./styles";

function ClientsUI() {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection: "google-oauth2",
        },
      });
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
    }
  };

  const handleSignInClick = () => {
    navigate("/welcome");
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
            Registrarse
          </Text>

          <Input
            id="id"
            label="Cédula"
            placeholder="No. de cédula"
            size="compact"
          />
        </Stack>
        <Stack gap="24px" direction="column" alignItems="center">
          <Button onClick={handleLoginClick}>Registrarse</Button>
          <Stack gap="12px">
            <Text
              type="body"
              size="medium"
              textAlign="center"
              appearance="gray"
            >
              ¿Ya te registraste?
            </Text>
            <Text
              type="body"
              size="medium"
              textAlign="center"
              appearance="primary"
              parentHover
              onClick={handleSignInClick}
            >
              Inicia sesión
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </StyledClients>
  );
}

export { ClientsUI };
