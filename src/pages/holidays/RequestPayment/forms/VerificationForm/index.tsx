import { MdOutlineArrowBack } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";

import { Accordion } from "@components/data/Accordion";
import { spacing } from "@design/tokens/spacing/spacing";

import { requestPaymentSteps } from "../../config/assisted.config";
import { VerificationBoxes } from "./VerificationBoxes";

interface VerificationFormProps {
  handleStepChange: (stepId: number) => void;
}

function VerificationForm({ handleStepChange }: VerificationFormProps) {
  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={spacing.s300}>
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
                stepKey={Number(step.id)}
              />

              <Button
                iconBefore={<MdOutlineArrowBack />}
                onClick={() => handleStepChange(step.number)}
                variant="none"
                appearance="dark"
              >
                Regresar a este paso
              </Button>
            </Stack>
          </Accordion>
        ))}
    </Stack>
  );
}

export { VerificationForm };
