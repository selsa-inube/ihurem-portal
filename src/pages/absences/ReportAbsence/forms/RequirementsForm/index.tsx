import { Stack, Button, useMediaQuery, Text, Icon } from "@inubekit/inubekit";
import { MdOutlineCheckCircle } from "react-icons/md";

import { AlertCard } from "@components/data/AlertCard";
import { spacing } from "@design/tokens/spacing/";

import { StyledContainer } from "./styles";
import { alerts } from "./config/alertConfig";

interface RequirementsFormProps {
  handleNextStep: () => void;
  noRestriction?: boolean;
}

const RequirementsForm = (props: RequirementsFormProps) => {
  const { handleNextStep, noRestriction = false } = props;
  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <Stack
      direction="column"
      gap={spacing.s200}
      justifyContent="space-between"
      height={isMobile ? "auto" : "55vh"}
    >
      <StyledContainer $isMobile={isMobile} $noRestriction={noRestriction}>
        {noRestriction ? (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            gap={spacing.s100}
          >
            <Icon
              icon={<MdOutlineCheckCircle />}
              appearance="success"
              size="54px"
            />
            <Text type="title" size="medium" textAlign="center">
              El empleado no presenta restricción por requisitos en este
              momento.
            </Text>
          </Stack>
        ) : (
          alerts.map((alert, index) => <AlertCard key={index} {...alert} />)
        )}
      </StyledContainer>
      <Stack justifyContent="flex-end" alignItems="flex-end">
        <Button appearance="primary" onClick={handleNextStep}>
          Siguiente
        </Button>
      </Stack>
    </Stack>
  );
};

export { RequirementsForm };
