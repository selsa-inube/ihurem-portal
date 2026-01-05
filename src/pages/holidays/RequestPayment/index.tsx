import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";

import {
  IUnifiedHumanResourceRequestData,
  ERequestType,
  ETaskStatus,
} from "@ptypes/humanResourcesRequest.types";
import { SendRequestModal } from "@components/modals/SendRequestModal";
import { RequestInfoModal } from "@components/modals/RequestInfoModal";
import { ProcessingRequestModal } from "@components/modals/ProcessingRequestModal";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { useTaskExecutionMode } from "@hooks/useTaskExecutionMode";
import { useRequestSubmission } from "@hooks/usePostHumanResourceRequest";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useHumanResourceRequestById } from "@hooks/useHumanResourceRequestById";
import { IStep } from "@components/feedback/AssistedProcess/types";
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
    if (!generalInformationRef.current) return;
    setFormValues(generalInformationRef.current.values);
    setIsCurrentFormValid(generalInformationRef.current.isValid);
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

  return {
    modalState,
    openSendModal: () =>
      setModalState((p) => ({ ...p, isSendModalVisible: true })),
    closeSendModal: () =>
      setModalState((p) => ({ ...p, isSendModalVisible: false })),
    openInfoModal: () =>
      setModalState({
        isSendModalVisible: false,
        isRequestInfoModalVisible: true,
      }),
    closeInfoModal: () =>
      setModalState((p) => ({ ...p, isRequestInfoModalVisible: false })),
  };
}

function RequestPayment() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [requestIdToTrack, setRequestIdToTrack] = useState<string>("");
  const [pollingTick, setPollingTick] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [processingCurrentStep, setProcessingCurrentStep] = useState(1);

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
    requestId,
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

  const { isAutomatic, isLoading } = useTaskExecutionMode(requestId ?? "");

  useEffect(() => {
    if (!requestId || isLoading) return;

    openSendModal();
  }, [requestId, isLoading]);

  const { humanResourceRequest } = useHumanResourceRequestById(
    requestIdToTrack,
    pollingTick,
  );

  useEffect(() => {
    if (humanResourceRequest?.tasksToManageTheHumanResourcesRequests?.length) {
      setIsDataLoaded(true);
    }
  }, [humanResourceRequest]);

  const assistedSteps: IStep[] = useMemo(() => {
    if (humanResourceRequest?.tasksToManageTheHumanResourcesRequests?.length) {
      return humanResourceRequest.tasksToManageTheHumanResourcesRequests.map(
        (task, index) => ({
          id: index + 1,
          number: index + 1,
          name: task.taskName,
          label: task.taskName,
          description: task.description,
          status: task.taskStatus,
        }),
      );
    }
    return [];
  }, [humanResourceRequest]);

  useEffect(() => {
    if (!showProcessingModal || !requestIdToTrack) return;

    const interval = setInterval(() => {
      setPollingTick((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [showProcessingModal, requestIdToTrack]);

  useEffect(() => {
    if (isDataLoaded && requestIdToTrack && isAutomatic) {
      setShowProcessingModal(true);
    }
  }, [isDataLoaded, requestIdToTrack, isAutomatic]);

  useEffect(() => {
    if (!humanResourceRequest?.tasksToManageTheHumanResourcesRequests) {
      return;
    }

    const tasks = humanResourceRequest.tasksToManageTheHumanResourcesRequests;

    const completedTasks = tasks.filter(
      (task) => task.taskStatus === ETaskStatus.completed,
    );

    const nextStep = completedTasks.length + 1;
    setProcessingCurrentStep(Math.min(nextStep, assistedSteps.length));

    const allCompleted = completedTasks.length === tasks.length;

    if (allCompleted) {
      setShowProcessingModal(false);
      setPollingTick(0);
      openInfoModal();
    }
  }, [humanResourceRequest]);

  const handleCloseProcessingModal = useCallback(() => {
    setShowProcessingModal(false);
    openInfoModal();
  }, [openInfoModal]);

  const handleFinishAssisted = () => {
    updateFormValues();
    setShowErrorFlag(false);

    if (isAutomatic) {
      return;
    }

    submitRequestHandler().then((isSuccess) => {
      if (!isSuccess) return;
    });
  };

  useErrorFlag(showErrorFlag, errorMessage, "Error", false, 10000);

  const handleNextStep = () => {
    if (currentStep < requestPaymentSteps.length) {
      updateFormValues();
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleConfirmSendModal = () => {
    closeSendModal();

    if (isAutomatic) {
      setRequestIdToTrack(requestId ?? "");
    } else {
      openInfoModal();
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

      {showProcessingModal && (
        <ProcessingRequestModal
          steps={assistedSteps}
          currentStepId={Math.min(processingCurrentStep, assistedSteps.length)}
          onCloseModal={handleCloseProcessingModal}
        />
      )}
    </>
  );
}

export { RequestPayment };
