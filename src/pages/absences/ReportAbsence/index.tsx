import { useRef, useState } from "react";
import { FormikProps } from "formik";

import { SendRequestModal } from "@components/modals/SendRequestModal";

import { ReportAbsenceUI } from "./interface";
import { reportAbsenceSteps } from "./config/assisted.config";
import { ModalState } from "./types";
import { IAbsenceMotiveEntry } from "./forms/AbsenceMotiveForm/types";

function useFormManagement() {
  const [formValues, setFormValues] = useState<IAbsenceMotiveEntry>({
    motive: "",
    subMotive: "",
    motiveDetails: "",
  });

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const absenceMotiveRef = useRef<FormikProps<IAbsenceMotiveEntry>>(null);

  const updateFormValues = () => {
    if (absenceMotiveRef.current) {
      setFormValues(absenceMotiveRef.current.values);
      setIsCurrentFormValid(absenceMotiveRef.current.isValid);
    }
  };

  return {
    formValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    absenceMotiveRef,
    updateFormValues,
  };
}

function useModalManagement() {
  const [modalState, setModalState] = useState<ModalState>({
    isSendModalVisible: false,
    isRequestInfoModalVisible: false,
  });

  const openSendModal = () =>
    setModalState((prev) => ({ ...prev, isSendModalVisible: true }));
  const closeSendModal = () =>
    setModalState((prev) => ({ ...prev, isSendModalVisible: false }));
  const openInfoModal = () =>
    setModalState({
      isSendModalVisible: false,
      isRequestInfoModalVisible: true,
    });
  const closeInfoModal = () =>
    setModalState((prev) => ({ ...prev, isRequestInfoModalVisible: false }));

  return {
    modalState,
    openSendModal,
    closeSendModal,
    openInfoModal,
    closeInfoModal,
  };
}

function ReportAbsence() {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    formValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    absenceMotiveRef,
    updateFormValues,
  } = useFormManagement();

  const { modalState, openSendModal, closeSendModal } = useModalManagement();

  const handleNextStep = () => {
    if (currentStep) {
      updateFormValues();
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      updateFormValues();
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishAssisted = () => {
    openSendModal();
  };

  const handleConfirmSendModal = () => {
    closeSendModal();
  };

  const breadcrumbs = {
    label: "Reportar ausencia",
    description: "Completa el asistido para reportar una ausencia.",
    crumbs: [
      { path: "/", label: "Inicio", id: "/", isActive: false },
      {
        path: "/absences",
        label: "Ausencias",
        id: "/absences",
        isActive: false,
      },
      {
        path: "/absences/report-absence",
        label: "Reportar",
        id: "/absences/report-absence",
        isActive: true,
      },
    ],
    url: "/absences",
  };

  return (
    <>
      <ReportAbsenceUI
        appName={breadcrumbs.label}
        appDescription={breadcrumbs.description}
        appRoute={breadcrumbs.crumbs}
        navigatePage={breadcrumbs.url}
        steps={reportAbsenceSteps}
        currentStep={currentStep}
        absenceMotiveRef={absenceMotiveRef}
        initialAbsenceMotiveValues={formValues}
        isCurrentFormValid={isCurrentFormValid}
        setIsCurrentFormValid={setIsCurrentFormValid}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        handleFinishAssisted={handleFinishAssisted}
      />

      {modalState.isSendModalVisible && (
        <SendRequestModal
          descriptionText="¿Realmente deseas enviar esta solicitud?"
          onSubmitButtonClick={handleConfirmSendModal}
          onCloseModal={closeSendModal}
          onSecondaryButtonClick={closeSendModal}
        />
      )}
    </>
  );
}

export { ReportAbsence };
