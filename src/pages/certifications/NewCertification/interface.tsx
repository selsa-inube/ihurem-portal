import { useState } from "react";
import { FormikProps } from "formik";
import {
  Stack,
  useMediaQuery,
  Assisted,
  IAssistedStep,
} from "@inubekit/inubekit";
import { MdRule } from "react-icons/md";

import { RequirementsModal } from "@components/modals/RequirementsModal";
import { ButtonRequirements } from "@components/inputs/ButtonWithCounter";
import { mockRequirements } from "@mocks/requirements/requirementsTable.mock";
import { mockAlertCards } from "@mocks/requirements/requirements-2.mock";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing/spacing";

import { GeneralInformationForm } from "./forms/GeneralInformationForm";
import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";
import { VerificationForm } from "./forms/VerificationForm";
import { AlertCardStep } from "./forms/RequirementsForm";

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

function NewCertificationUI(
  props: RequestEnjoymentUIProps & {
    initialGeneralInformationValues: IGeneralInformationEntry;
  },
) {
  const {
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
  } = props;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  const shouldDisableNext = currentStep !== 1 && !isCurrentFormValid;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AppMenu
        appName={appName}
        appRoute={appRoute}
        navigatePage={navigatePage}
        actionButton={
          <ButtonRequirements
            counter={mockAlertCards.length}
            buttonIcon={<MdRule />}
            buttonText="Solicitar Pago"
            isMobile={isTablet}
            onClick={handleOpenModal}
          />
        }
      >
        <Stack direction="column" gap={isTablet ? spacing.s300 : spacing.s500}>
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
            <Stack direction="column" gap={spacing.s500}>
              {currentStep === 1 && (
                <AlertCardStep handleNextStep={handleNextStep} />
              )}
              {currentStep === 2 && (
                <GeneralInformationForm
                  ref={generalInformationRef}
                  initialValues={initialGeneralInformationValues}
                  withNextButton={true}
                  onFormValid={setIsCurrentFormValid}
                  handleNextStep={handleNextStep}
                  handlePreviousStep={handlePreviousStep}
                />
              )}
            </Stack>
            {currentStep === 3 && (
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

      {isModalOpen && (
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

export { NewCertificationUI };
