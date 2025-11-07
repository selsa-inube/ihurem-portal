import { useState } from "react";
import {
  Stack,
  useMediaQuery,
  Assisted,
  IAssistedStep,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";
import { MdRule } from "react-icons/md";

import { RequirementsModal } from "@components/modals/RequirementsModal";
import { ButtonRequirements } from "@components/inputs/ButtonWithCounter";
import { mockRequirements } from "@mocks/requirements/requirementsTable.mock";
import { mockAlertCards } from "@mocks/requirements/requirements-2.mock";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";

import { IAbsenceMotiveEntry } from "./forms/AbsenceMotiveForm/types";
import { RequirementsForm } from "./forms/RequirementsForm";
import { AbsenceMotiveForm } from "./forms/AbsenceMotiveForm";

interface RequestEnjoymentUIProps {
  appName: string;
  appDescription: string;
  appRoute: IRoute[];
  navigatePage: string;
  steps: IAssistedStep[];
  currentStep: number;
  absenceMotiveRef: React.RefObject<FormikProps<IAbsenceMotiveEntry>>;
  initialAbsenceMotiveValues: IAbsenceMotiveEntry;
  isCurrentFormValid: boolean;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
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
    initialAbsenceMotiveValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    handleNextStep,
    handlePreviousStep,
    handleFinishAssisted,
  } = props;

  const shouldDisableNext = !isCurrentFormValid && currentStep != 1;

  const isTablet = useMediaQuery("(max-width: 1100px)");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
                initialValues={initialAbsenceMotiveValues}
                withNextButton={true}
                onFormValid={setIsCurrentFormValid}
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
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

export { ReportAbsenceUI };
