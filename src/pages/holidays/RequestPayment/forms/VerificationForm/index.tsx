import { MdOutlineArrowBack } from "react-icons/md";
import { Stack, Button, useMediaQuery } from "@inubekit/inubekit";

import { Accordion } from "@components/data/Accordion";
import { spacing } from "@design/tokens/spacing";
import { labels } from "@i18n/labels";

import { requestPaymentSteps } from "../../config/assisted.config";
import { VerificationBoxes } from "./VerificationBoxes";
import { IFormsUpdateData } from "../../types";
interface VerificationFormProps {
  updatedData: IFormsUpdateData;
  handleStepChange: (stepId: number) => void;
  handlePreviousStep: () => void;
  handleSubmit: () => void;
}

function VerificationForm(props: VerificationFormProps) {
  const { updatedData, handleStepChange, handlePreviousStep, handleSubmit } =
    props;

  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={isTablet ? spacing.s200 : spacing.s300}>
      {requestPaymentSteps
        .filter((step) => step.name.toLowerCase() !== "verificación")
        .map((step) => (
          <Accordion title={step.name} key={`${step.id}-box`}>
            <Stack
              direction="column"
              width="100%"
              alignItems="flex-end"
              gap={isTablet ? spacing.s150 : spacing.s200}
            >
              <VerificationBoxes
                isTablet={isTablet}
                updatedData={updatedData}
                stepKey={Number(step.id)}
              />

              <Button
                iconBefore={<MdOutlineArrowBack />}
                onClick={() => handleStepChange(step.number)}
                variant="none"
                appearance="dark"
              >
                {labels.holidays.verificationForm.backToStep}
              </Button>
            </Stack>
          </Accordion>
        ))}
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        gap={spacing.s250}
      >
        <Button
          onClick={handlePreviousStep}
          variant="outlined"
          appearance="gray"
        >
          {labels.holidays.verificationForm.previous}
        </Button>
        <Button onClick={handleSubmit} appearance="primary">
          {labels.holidays.verificationForm.submit}
        </Button>
      </Stack>
    </Stack>
  );
}

export { VerificationForm };
