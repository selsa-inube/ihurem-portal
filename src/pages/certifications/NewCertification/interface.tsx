import { Stack } from "@inubekit/stack";
import { Assisted, IAssistedStep } from "@inubekit/assisted";
import { useMediaQuery } from "@inubekit/hooks";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing/spacing";

interface NewCertificationUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  steps: IAssistedStep[];
  currentStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleFinishAssisted: () => void;
  appDescription?: string;
}

function NewCertificationUI(props: NewCertificationUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    steps,
    currentStep,
    handleNextStep,
    handlePreviousStep,
    handleFinishAssisted,
    appDescription,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <AppMenu
      appName={appName}
      appDescription={appDescription}
      appRoute={appRoute}
      navigatePage={navigatePage}
    >
      <Stack direction="column" gap={spacing.s500}>
        <Assisted
          step={steps[currentStep - 1]}
          totalSteps={steps.length}
          onNextClick={handleNextStep}
          onBackClick={handlePreviousStep}
          onSubmitClick={handleFinishAssisted}
          disableNext={false}
          size={isTablet ? "small" : "large"}
          controls={{
            goBackText: "Anterior",
            goNextText: "Siguiente",
            submitText: "Enviar",
          }}
        />
        <Stack direction="column" gap={spacing.s500}>
          {currentStep === 1 && <></>}
          {currentStep === 2 && <></>}
          {currentStep === 3 && <></>}
        </Stack>
      </Stack>
    </AppMenu>
  );
}

export { NewCertificationUI };
