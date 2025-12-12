import { Stack, Button, useMediaQuery } from "@inubekit/inubekit";

import { AlertCard } from "@components/data/AlertCard";
import { spacing } from "@design/tokens/spacing/";
import { labels } from "@i18n/labels";

import { StyledContainer } from "./styles";
import { alerts } from "./config/alertConfig";

interface AlertCardContainerProps {
  handleNextStep: () => void;
}

const AlertCardStep = ({ handleNextStep }: AlertCardContainerProps) => {
  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <Stack direction="column" gap={spacing.s200}>
      <StyledContainer $isMobile={isMobile}>
        {alerts.map((alert, index) => (
          <AlertCard key={index} {...alert} />
        ))}
      </StyledContainer>
      <Stack justifyContent="flex-end" gap={spacing.s100}>
        <Button appearance="primary" onClick={handleNextStep}>
          {labels.certifications.assisted.next}
        </Button>
      </Stack>
    </Stack>
  );
};

export { AlertCardStep };
