import { MdOutlineArrowBack } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";

import { Accordion } from "@components/Accordion";
import { spacing } from "@design/tokens/spacing/spacing";

import { newCCertificationApplication } from "../../config/assisted.config";
import { IFormsUpdateData } from "../../types";
import { VerificationBoxes } from "./VerificationBoxes";

interface VerificationFormProps {
  updatedData: IFormsUpdateData;
  handleStepChange: (stepId: number) => void;
}

function VerificationForm({
  updatedData,
  handleStepChange,
}: VerificationFormProps) {
  const isTablet = useMediaQuery("(max-width: 1224px)");

  return (
    <Stack direction="column" gap={spacing.s300}>
      {newCCertificationApplication
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
                Regresar a este paso
              </Button>
            </Stack>
          </Accordion>
        ))}
    </Stack>
  );
}

export { VerificationForm };
