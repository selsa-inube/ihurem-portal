import { useRef, useState } from "react";
import { FormikProps } from "formik";

import { SendRequestModal } from "@components/modals/SendRequestModal";
import { RequestInfoModal } from "@components/modals/RequestInfoModal";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { useRequestSubmission } from "@hooks/usePostHumanResourceRequest";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";
import { labels } from "@i18n/labels";

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
    contractId: "",
    contractNumber: "",
    businessName: "",
    contractType: "",
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

  const {
    modalState,
    openSendModal,
    closeSendModal,
    openInfoModal,
    closeInfoModal,
  } = useModalManagement();

  const userCodeInCharge = "User 1";
  const userNameInCharge = "Johan Daniel Garcia Nova";

  const {
    requestNum,
    submitRequestHandler,
    navigateAfterSubmission,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
  } = useRequestSubmission(
    formValues,
    ERequestType.absence,
    userCodeInCharge,
    userNameInCharge,
  );

  useErrorFlag(showErrorFlag, errorMessage, "Error", false, 10000);

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

  const handleConfirmSendModal = async () => {
    setShowErrorFlag(false);
    const isSuccess = await submitRequestHandler();

    if (isSuccess) {
      closeSendModal();
      openInfoModal();
    } else {
      closeSendModal();
    }
  };

  const handleSubmitRequestInfoModal = () => {
    closeInfoModal();
    navigateAfterSubmission("absences");
  };

  const breadcrumbs = {
    label: labels.absences.reportAbsence.breadcrumbs.label,
    description: labels.absences.reportAbsence.breadcrumbs.description,
    crumbs: [
      { path: "/", label: "Inicio", id: "/", isActive: false },
      {
        path: "/absences",
        label: labels.absences.breadcrumbs.appName,
        id: "/absences",
        isActive: false,
      },
      {
        path: "/absences/report-absence",
        label: labels.absences.reportAbsence.breadcrumbs.reportLabel,
        id: "/absences/report-absence",
        isActive: true,
      },
    ],
    url: "/absences",
  };

  const humanResourceRequestType = ERequestType.absence;
  const humanResourceRequestDate = new Date().toISOString();

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
        humanResourceRequestType={humanResourceRequestType}
        humanResourceRequestDate={humanResourceRequestDate}
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
          descriptionText={labels.absences.reportAbsence.modals.confirmSend}
          onSubmitButtonClick={handleConfirmSendModal}
          onCloseModal={closeSendModal}
          onSecondaryButtonClick={closeSendModal}
        />
      )}

      {modalState.isRequestInfoModalVisible && (
        <RequestInfoModal
          requestId={requestNum}
          staffName={userNameInCharge ?? ""}
          onCloseModal={handleSubmitRequestInfoModal}
          onSubmitButtonClick={handleSubmitRequestInfoModal}
          iconAppearance="success"
        />
      )}
    </>
  );
}

export { ReportAbsence };
