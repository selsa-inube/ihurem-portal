import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";

import {
  IUnifiedHumanResourceRequestData,
  ERequestType,
} from "@ptypes/humanResourcesRequest.types";
import { SendRequestModal } from "@components/modals/SendRequestModal";
import { RequestInfoModal } from "@components/modals/RequestInfoModal";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { useRequestSubmission } from "@hooks/usePostHumanResourceRequest";
import { useAppContext } from "@context/AppContext/useAppContext";
import { labels } from "@i18n/labels";

import { RequestPaymentUI } from "./interface";
import { requestPaymentSteps } from "./config/assisted.config";
import { ModalState } from "./types";

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
    const contrato = contracts?.[0];

    if (contrato) {
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
      setFormValues(generalInformationRef.current.values);
      setIsCurrentFormValid(generalInformationRef.current.isValid);
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

function RequestPayment() {
  const navigate = useNavigate();
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
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
  } = useRequestSubmission(
    formValues,
    ERequestType.paid_vacations,
    userCodeInCharge,
    userNameInCharge,
  );

  useErrorFlag(showErrorFlag, errorMessage, "Error", false, 10000);

  const handleNextStep = () => {
    if (currentStep < requestPaymentSteps.length) {
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
    navigate("/holidays", {
      state: {
        showFlag: true,
        flagTitle: labels.holidays.flags.sentTitle,
        flagMessage: labels.holidays.flags.sentMessage,
        isSuccess: true,
      },
    });
  };

  const breadcrumbs = {
    id: 3,
    label: labels.holidays.requestPayment.title,
    crumbs: [
      {
        path: "/",
        label: labels.holidays.breadcrumbs.home,
        id: "/",
        isActive: false,
      },
      {
        path: "/holidays",
        label: labels.holidays.breadcrumbs.vacations,
        id: "/holidays",
        isActive: false,
      },
      {
        path: "/holidays/request-payment",
        label: labels.holidays.breadcrumbs.requestPayment,
        id: "/holidays/request-payment",
        isActive: true,
      },
    ],
    url: "/holidays",
  };

  return (
    <>
      <RequestPaymentUI
        appName={breadcrumbs.label}
        appRoute={breadcrumbs.crumbs}
        navigatePage={breadcrumbs.url}
        steps={requestPaymentSteps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        handleFinishAssisted={handleFinishAssisted}
        generalInformationRef={generalInformationRef}
        initialGeneralInformationValues={formValues}
        isCurrentFormValid={isCurrentFormValid}
        setIsCurrentFormValid={setIsCurrentFormValid}
      />

      {modalState.isSendModalVisible && (
        <SendRequestModal
          descriptionText={labels.holidays.requestPayment.confirmationMessage}
          onSubmitButtonClick={handleConfirmSendModal}
          onCloseModal={closeSendModal}
          onSecondaryButtonClick={closeSendModal}
        />
      )}

      {modalState.isRequestInfoModalVisible && (
        <RequestInfoModal
          requestId={requestNum}
          staffName={userNameInCharge}
          onCloseModal={handleSubmitRequestInfoModal}
          onSubmitButtonClick={handleSubmitRequestInfoModal}
        />
      )}
    </>
  );
}

export { RequestPayment };
