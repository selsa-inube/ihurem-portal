import { useState, useMemo } from "react";
import {
  Stack,
  useMediaQuery,
  Assisted,
  IAssistedStep,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdRule } from "react-icons/md";

import { AbsenceRequirementsModal } from "@components/modals/AbsenceRequirementsModal";
import { ErrorModal } from "@components/modals/ErrorModal";
import { ButtonRequirements } from "@components/inputs/ButtonWithCounter";
import { mockRequirements } from "@mocks/requirements/requirementsTable.mock";
import { mockAlertCards } from "@mocks/requirements/requirements-2.mock";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";

import { IAbsenceMotiveEntry } from "./forms/AbsenceMotiveForm/types";
import { IAbsenceDurationEntry } from "./forms/AbsenceDurationForm/types";
import { IRequiredDocumentsEntry } from "./forms/RequiredDocumentsForm/types";
import { RequirementsForm } from "./forms/RequirementsForm";
import { AbsenceMotiveForm } from "./forms/AbsenceMotiveForm";
import { AbsenceDurationForm } from "./forms/AbsenceDurationForm";
import { RequiredDocumentsForm } from "./forms/RequiredDocumentsForm";
import { VerificationForm } from "./forms/VerificationForm/VerificationBoxes";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";

interface RequestEnjoymentUIProps {
  appName: string;
  appDescription: string;
  appRoute: IRoute[];
  navigatePage: string;
  steps: IAssistedStep[];
  currentStep: number;
  absenceMotiveRef: React.RefObject<FormikProps<IAbsenceMotiveEntry>>;
  absenceDurationRef: React.RefObject<FormikProps<IAbsenceDurationEntry>>;
  requiredDocumentsRef: React.RefObject<FormikProps<IRequiredDocumentsEntry>>;
  initialValues: IAbsenceMotiveEntry &
    IAbsenceDurationEntry &
    IRequiredDocumentsEntry;
  isCurrentFormValid: boolean;
  showStartTimeErrorModal: boolean;
  showRequiredDocsErrorModal: boolean;
  humanResourceRequestType: ERequestType;
  humanResourceRequestDate: string;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStartTimeErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRequiredDocsErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleFinishAssisted: () => void;
}

function ReportAbsenceUI(props: RequestEnjoymentUIProps) {
  const {
    appName,
    appDescription,
    appRoute,
    navigatePage,
    steps,
    currentStep,
    absenceMotiveRef,
    absenceDurationRef,
    requiredDocumentsRef,
    initialValues,
    isCurrentFormValid,
    showStartTimeErrorModal,
    showRequiredDocsErrorModal,
    setCurrentStep,
    setIsCurrentFormValid,
    setShowStartTimeErrorModal,
    setShowRequiredDocsErrorModal,
    handleNextStep,
    handlePreviousStep,
    handleFinishAssisted,
  } = props;

  const shouldDisableNext =
    !isCurrentFormValid && currentStep !== 1 && currentStep !== 4;

  const isTablet = useMediaQuery("(max-width: 1100px)");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { contracts } = useAppContext();

  const activeContract = useMemo(() => {
    return contracts && contracts.length > 0 ? contracts[0] : null;
  }, [contracts]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const absenceMotiveEntry: IAbsenceMotiveEntry = {
    motive: initialValues.motive ?? "",
    motiveDetails: initialValues.motiveDetails ?? "",
    subMotive: initialValues.subMotive,
    contractId: activeContract?.contractId ?? "",
    contractNumber: activeContract?.contractNumber ?? "",
    businessName: activeContract?.businessName ?? "",
    contractType: activeContract?.contractType ?? "",
  };

  const absenceDurationEntry: IAbsenceDurationEntry = {
    startDate: initialValues.startDate ?? "",
    daysDuration: initialValues.daysDuration ?? "",
    hoursDuration: initialValues.hoursDuration ?? "",
    startTime: initialValues.startTime ?? "",
  };

  const requiredDocumentsEntry: IRequiredDocumentsEntry = {
    documents: initialValues.documents ?? [],
  };

  return (
    <>
      <AppMenu
        appName={appName}
        appDescription={appDescription}
        appRoute={appRoute}
        navigatePage={navigatePage}
        actionButton={
          <ButtonRequirements
            counter={mockAlertCards.length}
            buttonIcon={<MdRule />}
            buttonText="Requisitos"
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
          <Stack direction="column" gap={spacing.s500}>
            {currentStep === 1 && (
              <RequirementsForm
                handleNextStep={handleNextStep}
                alerts={mockAlertCards}
              />
            )}
            {currentStep === 2 && (
              <AbsenceMotiveForm
                ref={absenceMotiveRef}
                initialValues={absenceMotiveEntry}
                withNextButton={true}
                onFormValid={setIsCurrentFormValid}
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
              />
            )}
            {currentStep === 3 && (
              <AbsenceDurationForm
                ref={absenceDurationRef}
                initialValues={absenceDurationEntry}
                withNextButton={true}
                motive={absenceMotiveEntry.motive}
                onFormValid={setIsCurrentFormValid}
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
              />
            )}
            {currentStep === 4 && (
              <RequiredDocumentsForm
                ref={requiredDocumentsRef}
                initialValues={requiredDocumentsEntry}
                withNextButton={true}
                onFormValid={setIsCurrentFormValid}
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
              />
            )}
            {currentStep === 5 && (
              <VerificationForm
                updatedData={{
                  absenceMotiveInformation: {
                    isValid: isCurrentFormValid,
                    values: absenceMotiveEntry,
                  },
                  absenceDurationInformation: {
                    isValid: isCurrentFormValid,
                    values: absenceDurationEntry,
                  },
                  requiredDocumentsInformation: {
                    isValid: isCurrentFormValid,
                    values: requiredDocumentsEntry,
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
        <AbsenceRequirementsModal
          title="Requisitos"
          buttonLabel="Cerrar"
          requirements={mockRequirements}
          handleClose={handleCloseModal}
        />
      )}

      {showStartTimeErrorModal && (
        <ErrorModal
          title="Alerta"
          descriptionText="Incluiste una duración en horas."
          solutionText='Para continuar primero debes seleccionar la "Hora de inicio aproximada" para la ausencia.'
          onCloseModal={() => setShowStartTimeErrorModal(false)}
          onSubmitButtonClick={() => setShowStartTimeErrorModal(false)}
        />
      )}

      {showRequiredDocsErrorModal && (
        <ErrorModal
          title="Alerta"
          solutionText="Para continuar debes cargar los documentos que sean obligatorios."
          onCloseModal={() => setShowRequiredDocsErrorModal(false)}
          onSubmitButtonClick={() => setShowRequiredDocsErrorModal(false)}
          onSolutionOnly
        />
      )}
    </>
  );
}

export { ReportAbsenceUI };
