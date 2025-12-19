import { Stack, Button, useMediaQuery, Text, Icon } from "@inubekit/inubekit";
import { MdOutlineCheckCircle } from "react-icons/md";

import { labels } from "@i18n/labels";
import { AlertCard } from "@components/data/AlertCard";
import { spacing } from "@design/tokens/spacing/";
import { AlertCardProps } from "@components/data/AlertCard";

import { StyledContainer } from "./styles";

interface RequirementsFormProps {
  handleNextStep: () => void;
  alerts: AlertCardProps[];
}

const RequirementsForm = (props: RequirementsFormProps) => {
  const { handleNextStep, alerts } = props;
  const isMobile = useMediaQuery("(max-width: 700px)");
  const noRestriction = alerts.length === 0;

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
              {
                labels.absences.reportAbsence.ui.requirementsForm
                  .noRestrictionsMessage
              }
            </Text>
          </Stack>
        ) : (
          alerts.map((alert, index) => <AlertCard key={index} {...alert} />)
        )}
      </StyledContainer>
      <Stack justifyContent="flex-end" alignItems="flex-end">
        <Button appearance="primary" onClick={handleNextStep}>
          {labels.absences.reportAbsence.ui.requirementsForm.nextButton}
        </Button>
      </Stack>
    </Stack>
  );
};

export { RequirementsForm };
