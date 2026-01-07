import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";

import {
  IUnifiedHumanResourceRequestData,
  ERequestType,
} from "@ptypes/humanResourcesRequest.types";

import { HumanResourceTaskExecution } from "@ptypes/humanResourcesTaskExecution.types";
import { ETaskStatus } from "@ptypes/humanResourcesRequest.types";
import { SendRequestModal } from "@components/modals/SendRequestModal";
import { RequestInfoModal } from "@components/modals/RequestInfoModal";
import { ProcessingRequestModal } from "@components/modals/ProcessingRequestModal";

import { useErrorFlag } from "@hooks/useErrorFlag";
import { useTaskExecutionMode } from "@hooks/useTaskExecutionMode";
import { useRequestSubmission } from "@hooks/usePostHumanResourceRequest";
import { useHumanResourceRequestById } from "@hooks/useHumanResourceRequestById";

import { useAppContext } from "@context/AppContext/useAppContext";

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

  const openSendModal = useCallback(
    () => setModalState((p) => ({ ...p, isSendModalVisible: true })),
    [],
  );

  const closeSendModal = useCallback(
    () => setModalState((p) => ({ ...p, isSendModalVisible: false })),
    [],
  );

  const openInfoModal = useCallback(
    () =>
      setModalState({
        isSendModalVisible: false,
        isRequestInfoModalVisible: true,
      }),
    [],
  );

  const closeInfoModal = useCallback(
    () => setModalState((p) => ({ ...p, isRequestInfoModalVisible: false })),
    [],
  );

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
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [requestIdToTrack, setRequestIdToTrack] = useState("");
  const [pollingTick, setPollingTick] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [waitingForExecutionMode, setWaitingForExecutionMode] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);

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

  const {
    tasks,
    isAutomatic,
    isLoading,
    error: taskExecutionError,
  } = useTaskExecutionMode(requestId ?? "");

  useEffect(() => {
    if (requestId && isLoading && !hasStartedLoading) {
      setHasStartedLoading(true);
    }
  }, [requestId, isLoading, hasStartedLoading]);

  useEffect(() => {
    if (taskExecutionError) {
      setWaitingForExecutionMode(false);
    }
  }, [taskExecutionError]);

  const { humanResourceRequest, error: pollingError } =
    useHumanResourceRequestById(requestIdToTrack, pollingTick);

  useEffect(() => {
    if (pollingError) {
      setShowProcessingModal(false);
      setTimeout(() => {
        navigate("/holidays");
      }, 100);
    }
  }, [pollingError, navigate]);

  const assistedSteps: IStep[] = useMemo(() => {
    if (!tasks?.length) {
      return [];
    }

    const activeTasks =
      humanResourceRequest?.tasksToManageTheHumanResourcesRequests ?? [];
    const currentTask =
      activeTasks.find(
        (task) =>
          task.taskStatus !== ETaskStatus.executed &&
          task.taskStatus !== ETaskStatus.completed,
      ) ?? activeTasks[activeTasks.length - 1];

    const currentTaskIndex = currentTask
      ? tasks.findIndex((t) => t.taskCode === currentTask.taskCode)
      : -1;

    const steps = tasks.map(
      (task: HumanResourceTaskExecution, index: number): IStep => {
        let stepStatus: ETaskStatus;

        if (currentTaskIndex === -1) {
          stepStatus = ETaskStatus.pending;
        } else if (index < currentTaskIndex) {
          stepStatus = ETaskStatus.completed;
        } else if (index === currentTaskIndex) {
          if (currentTask!.taskStatus === ETaskStatus.executed) {
            stepStatus = ETaskStatus.completed;
          } else {
            stepStatus = currentTask!.taskStatus;
          }
        } else {
          stepStatus = ETaskStatus.pending;
        }

        return {
          id: index + 1,
          number: index + 1,
          name: task.taskName,
          label: task.taskName,
          description: task.methodOfExecution,
          status: stepStatus,
        };
      },
    );

    const allTasksCompleted = steps.every(
      (step) => step.status === ETaskStatus.completed,
    );

    steps.push({
      id: steps.length + 1,
      number: steps.length + 1,
      name: "Proceso completado",
      label: "Proceso completado",
      description: "La solicitud ha sido procesada exitosamente",
      status: allTasksCompleted ? ETaskStatus.completed : ETaskStatus.pending,
    });

    return steps;
  }, [tasks, humanResourceRequest]);

  const currentStepIndex = useMemo(() => {
    const pendingIndex = assistedSteps.findIndex(
      (step) => step.status !== ETaskStatus.completed,
    );
    return pendingIndex >= 0 ? pendingIndex + 1 : assistedSteps.length;
  }, [assistedSteps]);

  useEffect(() => {
    if (
      !waitingForExecutionMode ||
      !requestId ||
      isLoading ||
      !hasStartedLoading
    )
      return;

    setWaitingForExecutionMode(false);

    if (isAutomatic) {
      setRequestIdToTrack(requestId);
    } else {
      openInfoModal();
    }
  }, [
    waitingForExecutionMode,
    requestId,
    isAutomatic,
    isLoading,
    hasStartedLoading,
    openInfoModal,
  ]);

  useEffect(() => {
    if (humanResourceRequest?.tasksToManageTheHumanResourcesRequests?.length) {
      setIsDataLoaded(true);
    }
  }, [humanResourceRequest]);

  const allTasksCompleted = useMemo(() => {
    if (!humanResourceRequest?.tasksToManageTheHumanResourcesRequests?.length) {
      return false;
    }

    return humanResourceRequest.tasksToManageTheHumanResourcesRequests.every(
      (task) =>
        task.taskStatus === ETaskStatus.executed ||
        task.taskStatus === ETaskStatus.completed,
    );
  }, [humanResourceRequest]);

  useEffect(() => {
    if (!requestIdToTrack || allTasksCompleted) return;

    const interval = setInterval(() => {
      setPollingTick((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [requestIdToTrack, allTasksCompleted]);

  useEffect(() => {
    if (isDataLoaded && requestIdToTrack && isAutomatic) {
      setShowProcessingModal(true);
    }
  }, [isDataLoaded, requestIdToTrack, isAutomatic]);

  const handleCloseProcessingModal = () => {
    setShowErrorFlag(false);
    setShowProcessingModal(false);
    setRequestIdToTrack("");
    navigate("/holidays", {
      state: {
        showFlag: true,
        flagTitle: labels.holidays.flags.sentTitle,
        flagMessage: labels.holidays.flags.sentMessage,
        isSuccess: true,
      },
    });
  };

  const handleFinishAssisted = () => {
    updateFormValues();
    setShowErrorFlag(false);
    openSendModal();
  };

  useErrorFlag(showErrorFlag, errorMessage, "Error", false, 10000);

  const handleNextStep = () => {
    if (currentStep < requestPaymentSteps.length) {
      updateFormValues();
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleConfirmSendModal = async () => {
    closeSendModal();

    const isSuccess = await submitRequestHandler();

    if (!isSuccess) return;

    setHasStartedLoading(false);
    setWaitingForExecutionMode(true);
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
          currentStepId={currentStepIndex}
          onCloseModal={handleCloseProcessingModal}
        />
      )}
    </>
  );
}

export { RequestPayment };
