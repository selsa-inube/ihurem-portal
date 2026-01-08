import { Icon, Text, Grid, Stack } from "@inubekit/inubekit";
import { MdCheckCircle } from "react-icons/md";

import { spacing } from "@design/tokens/spacing";

import {
  StyledProgressBar,
  StyledProgressIndicator,
  StyledStepIndicator,
} from "./styles";
import { Variant, IStep } from "./types";

interface IProgressBarProps {
  currentStep: number;
  arrayLength: number;
  variant?: Variant;
}

function ProgressBar(props: IProgressBarProps) {
  const { currentStep, arrayLength, variant = "primary" } = props;
  return (
    <StyledProgressBar>
      <StyledProgressIndicator
        $currentStep={currentStep}
        $arrayLength={arrayLength}
        $variant={variant}
      />
    </StyledProgressBar>
  );
}

export interface IAssistedProcessProps {
  steps: IStep[];
  currentStepId: number;
  variant?: Variant;
}

function AssistedProcess(props: IAssistedProcessProps) {
  const { steps, currentStepId, variant = "primary" } = props;
  const currentStepIndex = steps.findIndex((step) => step.id === currentStepId);
  const currentStep = steps[currentStepIndex];

  return (
    <Grid templateColumns="1fr">
      <Stack direction="column" gap={spacing.s100}>
        <Grid
          templateColumns="auto auto 1fr auto"
          gap={spacing.s100}
          alignItems="center"
        >
          <StyledStepIndicator $variant={variant}>
            {currentStepId !== steps.length ? (
              <Text
                type="label"
                weight="bold"
                size="medium"
                appearance={variant}
              >
                {currentStepId}
              </Text>
            ) : (
              <Icon
                appearance={variant}
                icon={<MdCheckCircle />}
                spacing="compact"
              />
            )}
          </StyledStepIndicator>
          <Text type="title" weight="bold" size="small" ellipsis>
            {currentStep.label}
          </Text>
        </Grid>
        <Stack alignItems="center" gap={spacing.s100}>
          <ProgressBar
            currentStep={currentStepIndex + 1}
            arrayLength={steps.length}
            variant={variant}
          />
          <Text type="label" weight="bold" size="small">
            {currentStepIndex + 1}/{steps.length}
          </Text>
        </Stack>
        <Text type="label" appearance="gray" size="small" textAlign="center">
          {Math.round(((currentStepIndex + 1) / steps.length) * 100)}%
        </Text>
      </Stack>
    </Grid>
  );
}

export { AssistedProcess };
