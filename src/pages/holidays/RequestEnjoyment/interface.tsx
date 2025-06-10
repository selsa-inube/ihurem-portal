import { useState } from "react";
import { FormikProps } from "formik";
import { Stack, Assisted, IAssistedStep } from "@inubekit/inubekit";
import { MdRule } from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";
import { RequirementsModal } from "@components/modals/RequirementsModal";
import { mockRequirements } from "@mocks/requirements/requirementsTable.mock";
import { mockAlertCards } from "@mocks/requirements/requirements-2.mock";
import { ButtonRequirements } from "@components/inputs/ButtonWithCounter";
import { showRequirements } from "@pages/holidays/config/requirements";

import { GeneralInformationForm } from "./forms/GeneralInformationForm";
import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";
import { VerificationForm } from "./forms/VerificationForm";
import { AlertCardContainer } from "./forms/RequirementsForm";

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
  const shouldDisableNext = showRequirements
    ? currentStep !== 1 && !isCurrentFormValid
    : currentStep === 1 && !isCurrentFormValid;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getStepContent = () => {
    if (showRequirements) {
      if (currentStep === 1) {
        return <AlertCardContainer handleNextStep={handleNextStep} />;
      } else if (currentStep === 2) {
        return (
          <GeneralInformationForm
            ref={generalInformationRef}
            initialValues={initialGeneralInformationValues}
            handlePreviousStep={handlePreviousStep}
            onFormValid={setIsCurrentFormValid}
            handleNextStep={handleNextStep}
            withNextButton
          />
        );
      } else if (currentStep === 3) {
        return (
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
        );
      }
    } else {
      if (currentStep === 1) {
        return (
          <GeneralInformationForm
            ref={generalInformationRef}
            initialValues={initialGeneralInformationValues}
            withNextButton={true}
            handlePreviousStep={handlePreviousStep}
            onFormValid={setIsCurrentFormValid}
            handleNextStep={handleNextStep}
          />
        );
      } else if (currentStep === 2) {
        return (
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
        );
      }
    }
    return null;
  };

  return (
    <>
      <AppMenu
        appName={appName}
        appRoute={appRoute}
        navigatePage={navigatePage}
        actionButton={
          showRequirements ? (
            <ButtonRequirements
              counter={mockAlertCards.length}
              buttonIcon={<MdRule />}
              buttonText="Solicitar Pago"
              isMobile={isTablet}
              onClick={handleOpenModal}
            />
          ) : undefined
        }
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
          <Stack direction="column">{getStepContent()}</Stack>
        </Stack>
      </AppMenu>
      {showRequirements && isModalOpen && (
        <RequirementsModal
          title="Requisitos"
          buttonLabel="Cerrar"
          requirements={mockRequirements}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
}

export { RequestEnjoymentUI };
