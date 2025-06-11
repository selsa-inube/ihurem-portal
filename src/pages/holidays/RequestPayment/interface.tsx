import { useState } from "react";
import { FormikProps } from "formik";
import {
  Stack,
  Assisted,
  IAssistedStep,
  useMediaQuery,
} from "@inubekit/inubekit";
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
import { AlertCardStep } from "./forms/RequirementsForm";

interface RequestPaymentUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  steps: IAssistedStep[];
  currentStep: number;
  generalInformationRef: React.RefObject<FormikProps<IGeneralInformationEntry>>;
  initialGeneralInformationValues: IGeneralInformationEntry;
  isCurrentFormValid: boolean;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleFinishAssisted: () => void;
}

function RequestPaymentUI({
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
}: RequestPaymentUIProps) {
  const isTablet = useMediaQuery("(max-width: 1100px)");
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
        return <AlertCardStep handleNextStep={handleNextStep} />;
      }
      if (currentStep === 2) {
        return (
          <GeneralInformationForm
            ref={generalInformationRef}
            initialValues={initialGeneralInformationValues}
            withNextButton
            handlePreviousStep={handlePreviousStep}
            onFormValid={setIsCurrentFormValid}
            handleNextStep={handleNextStep}
          />
        );
      }
      if (currentStep === 3) {
        return (
          <VerificationForm
            updatedData={{
              personalInformation: {
                isValid: isCurrentFormValid,
                values: initialGeneralInformationValues,
              },
            }}
            handleStepChange={setCurrentStep}
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
            onFormValid={setIsCurrentFormValid}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            withNextButton
          />
        );
      }
      if (currentStep === 2) {
        return (
          <VerificationForm
            updatedData={{
              personalInformation: {
                isValid: isCurrentFormValid,
                values: initialGeneralInformationValues,
              },
            }}
            handleStepChange={setCurrentStep}
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

export { RequestPaymentUI };
