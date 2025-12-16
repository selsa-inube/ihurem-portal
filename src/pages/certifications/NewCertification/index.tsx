import { useRef, useState, useEffect } from "react";
import { FormikProps } from "formik";
import { useMediaQuery } from "@inubekit/inubekit";

import { SendRequestModal } from "@components/modals/SendRequestModal";
import { RequestInfoModal } from "@components/modals/RequestInfoModal";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { useRequestSubmission } from "@hooks/usePostHumanResourceRequest";
import { useAppContext } from "@context/AppContext/useAppContext";

import { NewCertificationUI } from "./interface";
import { newCCertificationApplication } from "./config/assisted.config";
import { ModalState } from "./types";

import { IUnifiedHumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";

function useFormManagement() {
  const { contracts } = useAppContext();

  const [formValues, setFormValues] =
    useState<IUnifiedHumanResourceRequestData>({
      contractId: "",
      contractNumber: "",
      businessName: "",
      contractType: "",
      observationEmployee: "",
      daysToPay: "",
      disbursementDate: "",
      daysOff: "",
      startDateEnyoment: "",
      certificationType: "",
      addressee: "",
    });

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const generalInformationRef =
    useRef<FormikProps<IUnifiedHumanResourceRequestData>>(null);

  useEffect(() => {
    console.log("[useFormManagement] Contracts:", contracts);

    const contrato = contracts?.[0];

    if (contrato) {
      console.log(
        "[useFormManagement] Loading contract into formValues:",
        contrato,
      );
      setFormValues((prev) => ({
        ...prev,
        contractId: contrato.contractId ?? "",
        contractNumber: contrato.contractNumber ?? "",
        businessName: contrato.businessName ?? "",
        contractType: contrato.contractType ?? "",
      }));
    }
  }, [contracts]);

  const updateFormValues = () => {
    if (generalInformationRef.current) {
      console.log(
        "[useFormManagement] Updating formValues from Formik:",
        generalInformationRef.current.values,
      );
      setFormValues(generalInformationRef.current.values);
      setIsCurrentFormValid(generalInformationRef.current.isValid);
    } else {
      console.log("[useFormManagement] generalInformationRef is null");
    }
  };

  return {
    formValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    generalInformationRef,
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

function NewCertification() {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    formValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    generalInformationRef,
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
    ERequestType.certification,
    userCodeInCharge,
    userNameInCharge,
  );

  useErrorFlag(showErrorFlag, errorMessage, "Error", false, 10000);

  const handleNextStep = () => {
    if (currentStep < newCCertificationApplication.length) {
      updateFormValues();
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishAssisted = () => {
    updateFormValues();
    openSendModal();
  };

  const handleConfirmSendModal = async () => {
    updateFormValues();
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
    navigateAfterSubmission("certifications");
  };

  const isTablet = useMediaQuery("(max-width: 1100px)");

  const breadcrumbs = {
    label: "Agregar solicitud",
    crumbs: [
      { path: "/", label: "Inicio", id: "/", isActive: false },
      {
        path: "/certifications",
        label: isTablet ? "..." : "Certificaciones",
        id: "/certifications",
        isActive: false,
      },
      {
        path: "/certifications/new-certification",
        label: "Agregar solicitud",
        id: "/certifications/new-certification",
        isActive: true,
      },
    ],
    url: "/certifications",
  };

  return (
    <>
      <NewCertificationUI
        appName={breadcrumbs.label}
        appRoute={breadcrumbs.crumbs}
        navigatePage={breadcrumbs.url}
        steps={newCCertificationApplication}
        currentStep={currentStep}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        handleFinishAssisted={handleFinishAssisted}
        setIsCurrentFormValid={setIsCurrentFormValid}
        setCurrentStep={setCurrentStep}
        isCurrentFormValid={isCurrentFormValid}
        generalInformationRef={generalInformationRef}
        initialGeneralInformationValues={formValues}
      />

      {modalState.isSendModalVisible && (
        <SendRequestModal
          descriptionText="¿Realmente deseas enviar la solicitud de certificación?"
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
        />
      )}
    </>
  );
}

export { NewCertification };
