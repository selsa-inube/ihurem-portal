import { useRef, useState } from "react";
import { FormikProps } from "formik";

import { SendRequestModal } from "@components/modals/SendRequestModal";

import { ReportAbsenceUI } from "./interface";
import { reportAbsenceSteps } from "./config/assisted.config";
import { ModalState } from "./types";
import { IAbsenceMotiveEntry } from "./forms/AbsenceMotiveForm/types";
import { IAbsenceDurationEntry } from "./forms/AbsenceDurationForm/types";
import { IRequiredDocumentsEntry } from "./forms/RequiredDocumentsForm/types";
import { IDocument } from "./forms/RequiredDocumentsForm/RequiredDocumentsTable/types";
import { mockDocuments } from "./forms/RequiredDocumentsForm/config/formConfig";

function useFormManagement() {
  const [formValues, setFormValues] = useState<
    IAbsenceMotiveEntry & IAbsenceDurationEntry & IRequiredDocumentsEntry
  >({
    motive: "",
    subMotive: "",
    motiveDetails: "",
    startDate: "",
    daysDuration: "",
    hoursDuration: "",
    startTime: "",
    documents: mockDocuments,
  });

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const absenceMotiveRef = useRef<FormikProps<IAbsenceMotiveEntry>>(null);
  const absenceDurationRef = useRef<FormikProps<IAbsenceDurationEntry>>(null);
  const requiredDocumentsRef =
    useRef<FormikProps<IRequiredDocumentsEntry>>(null);

  const updateFormValues = () => {
    if (absenceMotiveRef.current) {
      setFormValues((prev) => ({
        ...prev,
        ...absenceMotiveRef.current!.values,
      }));
      setIsCurrentFormValid(absenceMotiveRef.current.isValid);
    }

    if (absenceDurationRef.current) {
      setFormValues((prev) => ({
        ...prev,
        ...absenceDurationRef.current!.values,
      }));
      setIsCurrentFormValid(absenceDurationRef.current.isValid);
    }

    if (requiredDocumentsRef.current) {
      setFormValues((prev) => ({
        ...prev,
        ...requiredDocumentsRef.current!.values,
      }));
      setIsCurrentFormValid(requiredDocumentsRef.current.isValid);
    }
  };

  return {
    formValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    absenceMotiveRef,
    absenceDurationRef,
    requiredDocumentsRef,
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
  const [showStartTimeErrorModal, setShowStartTimeErrorModal] = useState(false);
  const [showRequiredDocsErrorModal, setShowRequiredDocsErrorModal] =
    useState(false);

  const {
    formValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    absenceMotiveRef,
    absenceDurationRef,
    requiredDocumentsRef,
    updateFormValues,
  } = useFormManagement();

  const { modalState, openSendModal, closeSendModal } = useModalManagement();

  const validateRequiredDocuments = () => {
    if (!requiredDocumentsRef.current) return true;

    const documents = requiredDocumentsRef.current.values.documents || [];

    if (documents.length === 0) return true;

    const requiredDocs = documents.filter((doc: IDocument) => doc.required);
    const allRequiredHaveFiles = requiredDocs.every(
      (doc: IDocument) => doc.attachedFiles && doc.attachedFiles.length > 0,
    );
    return allRequiredHaveFiles;
  };

  const handleNextStep = () => {
    if (currentStep === 3 && absenceDurationRef.current) {
      const values = absenceDurationRef.current.values;
      const hasHoursDuration =
        values.hoursDuration && Number(values.hoursDuration) > 0;

      if (hasHoursDuration && !values.startTime) {
        setShowStartTimeErrorModal(true);
        return;
      }
    }

    if (currentStep === 4) {
      const isValid = validateRequiredDocuments();
      if (!isValid) {
        setShowRequiredDocsErrorModal(true);
        return;
      }
    }

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
        absenceDurationRef={absenceDurationRef}
        requiredDocumentsRef={requiredDocumentsRef}
        initialValues={formValues}
        isCurrentFormValid={isCurrentFormValid}
        showStartTimeErrorModal={showStartTimeErrorModal}
        showRequiredDocsErrorModal={showRequiredDocsErrorModal}
        setCurrentStep={setCurrentStep}
        setIsCurrentFormValid={setIsCurrentFormValid}
        setShowStartTimeErrorModal={setShowStartTimeErrorModal}
        setShowRequiredDocsErrorModal={setShowRequiredDocsErrorModal}
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
