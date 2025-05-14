import React from "react";
import { Stack, Button, useMediaQuery } from "@inubekit/inubekit";

import { AlertCard } from "@components/data/AlertCard";
import { spacing } from "@design/tokens/spacing/spacing";

import { StyledContainer } from "./styles";
import { alerts } from "./config/alertConfig";

interface AlertCardContainerProps {
  handleNextStep: () => void;
}

const AlertCardContainer: React.FC<AlertCardContainerProps> = ({
  handleNextStep,
}) => {
  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <Stack direction="column" gap={spacing.s200}>
      <StyledContainer $isMobile={isMobile}>
        {alerts.map((alert, index) => (
          <AlertCard key={index} {...alert} />
        ))}
      </StyledContainer>
      <Stack justifyContent="flex-end">
        <Button onClick={handleNextStep}>Siguiente</Button>
      </Stack>
    </Stack>
  );
};

export { AlertCardContainer };
