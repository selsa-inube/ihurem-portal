import React from "react";
import { Button } from "@inubekit/button";
import { Text } from "@inubekit/text";
import { Input } from "@inubekit/input";
import { Stack } from "@inubekit/stack";

import { IClient } from "@context/AppContext/types";

import selsaLogo from "@assets/images/logo-inube.png";

import { IClientState } from "./types";
import { StyledClients } from "./styles";

interface ClientsUIProps {
  clients: IClient[];
  search: string;
  client: IClientState;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClientChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterClients: (clients: IClient[]) => IClient[];
  handleSubmit: (event?: Event) => void;
}

function ClientsUI({ handleSubmit }: ClientsUIProps) {
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
            id="cédula"
            label="Cédula"
            placeholder="No. de cédula"
            required={false}
            size="compact"
            status="pending"
          />
        </Stack>
        <Stack gap="24px" direction="column" alignItems="center">
          <Button onClick={handleSubmit}>Regístrate</Button>
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
