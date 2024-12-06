import { FormikProps } from "formik";
import { Stack } from "@inubekit/stack";
import { Assisted, IAssistedStep } from "@inubekit/assisted";
import { useMediaQuery } from "@inubekit/hooks";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing/spacing";

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
  setCurrentStep,
  setIsCurrentFormValid,
  handleNextStep,
  handlePreviousStep,
  handleFinishAssisted,
}: RequestEnjoymentUIProps & {
  initialGeneralInformationValues: IGeneralInformationEntry;
}) {
  const isTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <AppMenu appName={appName} appRoute={appRoute} navigatePage={navigatePage}>
      <Stack direction="column" gap={isTablet ? spacing.s300 : spacing.s500}>
        <Assisted
          step={steps[currentStep - 1]}
          totalSteps={steps.length}
          disableNext={!isCurrentFormValid}
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
        <Stack direction="column" gap={spacing.s500}>
          {currentStep === 1 && (
            <GeneralInformationForm
              ref={generalInformationRef}
              initialValues={initialGeneralInformationValues}
              withNextButton={true}
              onFormValid={setIsCurrentFormValid}
              handleNextStep={handleNextStep}
            />
          )}
          {currentStep === 3 && (
            <VerificationForm
              updatedData={{
                personalInformation: {
                  isValid: isCurrentFormValid,
                  values: initialGeneralInformationValues,
                },
              }}
              handleStepChange={(stepId) => setCurrentStep(stepId)}
            />
          )}
        </Stack>
      </Stack>
    </AppMenu>
  );
}

export { RequestEnjoymentUI };
