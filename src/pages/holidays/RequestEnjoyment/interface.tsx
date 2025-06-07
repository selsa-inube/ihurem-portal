import { FormikProps } from "formik";
import { Stack, Assisted, IAssistedStep } from "@inubekit/inubekit";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";

import { GeneralInformationForm } from "./forms/GeneralInformationForm";
import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";
import { VerificationForm } from "./forms/VerificationForm";

interface RequestEnjoymentUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  steps: IAssistedStep[];
  currentStep: number;
  generalInformationRef: React.RefObject<FormikProps<IGeneralInformationEntry>>;
  isCurrentFormValid: boolean;
  isTablet: boolean;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleFinishAssisted: () => void;
}

function RequestEnjoymentUI({
  appName,
  appRoute,
  navigatePage,
  steps,
  currentStep,
  generalInformationRef,
  initialGeneralInformationValues,
  isCurrentFormValid,
  isTablet,
  setCurrentStep,
  setIsCurrentFormValid,
  handleNextStep,
  handlePreviousStep,
  handleFinishAssisted,
}: RequestEnjoymentUIProps & {
  initialGeneralInformationValues: IGeneralInformationEntry;
}) {
  const shouldDisableNext = currentStep === 1 && !isCurrentFormValid;

  return (
    <AppMenu
      appName={appName}
      appRoute={appRoute}
      navigatePage={navigatePage}
      showBackModal
    >
      <Stack direction="column" gap={isTablet ? spacing.s200 : spacing.s500}>
        <Assisted
          step={steps[currentStep - 1]}
          totalSteps={steps.length}
          disableNext={shouldDisableNext}
          size={isTablet ? "small" : "large"}
          controls={{
            goBackText: "Anterior",
            goNextText: "Siguiente",
            submitText: "Enviar",
          }}
          onNextClick={handleNextStep}
          onBackClick={handlePreviousStep}
          onSubmitClick={handleFinishAssisted}
        />
        <Stack direction="column">
          {currentStep === 1 && (
            <GeneralInformationForm
              ref={generalInformationRef}
              initialValues={initialGeneralInformationValues}
              withNextButton={true}
              onFormValid={setIsCurrentFormValid}
              handleNextStep={handleNextStep}
            />
          )}
          {currentStep === 2 && (
            <VerificationForm
              updatedData={{
                personalInformation: {
                  isValid: isCurrentFormValid,
                  values: initialGeneralInformationValues,
                },
              }}
              handleStepChange={(stepId) => setCurrentStep(stepId)}
              handlePreviousStep={handlePreviousStep}
              handleSubmit={handleFinishAssisted}
            />
          )}
        </Stack>
      </Stack>
    </AppMenu>
  );
}

export { RequestEnjoymentUI };
