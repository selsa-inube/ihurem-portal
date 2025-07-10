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

import { GeneralInformationForm } from "./forms/GeneralInformationForm";
import { IUnifiedHumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";
import { VerificationForm } from "./forms/VerificationForm";
import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";

interface RequestPaymentUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  steps: IAssistedStep[];
  currentStep: number;
  generalInformationRef: React.RefObject<
    FormikProps<IUnifiedHumanResourceRequestData>
  >;
  initialGeneralInformationValues: IUnifiedHumanResourceRequestData;
  isCurrentFormValid: boolean;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleFinishAssisted: () => void;
}

function RequestPaymentUI(props: RequestPaymentUIProps) {
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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const generalInformationEntry: IGeneralInformationEntry = {
    id: "",
    contract: initialGeneralInformationValues.contractId ?? "",
    contractDesc: initialGeneralInformationValues.contractType ?? "",
    observations: initialGeneralInformationValues.observationEmployee ?? "",
    daysToPay: String(initialGeneralInformationValues.daysToPay ?? ""),
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
        showBackModal
      >
        <Stack direction="column" gap={isTablet ? spacing.s300 : spacing.s500}>
          <Assisted
            step={steps[currentStep - 1]}
            totalSteps={steps.length}
            onNextClick={handleNextStep}
            onBackClick={handlePreviousStep}
            onSubmitClick={handleFinishAssisted}
            disableNext={shouldDisableNext}
            size={isTablet ? "small" : "large"}
            controls={{
              goBackText: "Anterior",
              goNextText: "Siguiente",
              submitText: "Enviar",
            }}
          />

          <Stack direction="column">
            {currentStep === 1 && (
              <GeneralInformationForm
                ref={generalInformationRef}
                initialValues={initialGeneralInformationValues}
                withNextButton={true}
                handlePreviousStep={handlePreviousStep}
                onFormValid={setIsCurrentFormValid}
                handleNextStep={handleNextStep}
              />
            )}
            {currentStep === 2 && (
              <VerificationForm
                updatedData={{
                  personalInformation: {
                    isValid: isCurrentFormValid,
                    values: generalInformationEntry,
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

export { RequestPaymentUI };
