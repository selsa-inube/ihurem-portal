import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { FormikProps } from "formik";
import { useMediaQuery } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { SendRequestModal } from "@components/modals/SendRequestModal";
import { RequestInfoModal } from "@components/modals/RequestInfoModal";
import { ProcessingRequestModal } from "@components/modals/ProcessingRequestModal";
import { useTaskExecutionMode } from "@hooks/useTaskExecutionMode";
import { IStep } from "@components/feedback/AssistedProcess/types";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { useRequestSubmission } from "@hooks/usePostHumanResourceRequest";
import {
  IUnifiedHumanResourceRequestData,
  ERequestType,
  ETaskStatus,
} from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useHumanResourceRequestById } from "@hooks/useHumanResourceRequestById";
import { HumanResourceTaskExecution } from "@ptypes/humanResourcesTaskExecution.types";

import { RequestEnjoymentUI } from "./interface";
import { requestEnjoymentSteps } from "./config/assisted.config";
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
      daysOff: "",
      disbursementDate: "",
      startDateEnyoment: "",
      certificationType: "",
      addressee: "",
    });

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const generalInformationRef =
    useRef<FormikProps<IUnifiedHumanResourceRequestData>>(null);

  useEffect(() => {
    if (contracts?.length === 1) {
      const contrato = contracts[0];

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

  const openSendModal = useCallback(
    () => setModalState((prev) => ({ ...prev, isSendModalVisible: true })),
    [],
  );

  const closeSendModal = useCallback(
    () => setModalState((prev) => ({ ...prev, isSendModalVisible: false })),
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
    () =>
      setModalState((prev) => ({ ...prev, isRequestInfoModalVisible: false })),
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

function RequestEnjoyment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [requestIdToTrack, setRequestIdToTrack] = useState<string>("");
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
    navigateAfterSubmission,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
  } = useRequestSubmission(
    formValues,
    ERequestType.vacations_enjoyed,
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
        navigateAfterSubmission("vacations");
      }, 100);
    }
  }, [pollingError, navigateAfterSubmission]);

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
    if (allTasksCompleted && requestIdToTrack) {
      console.log("✅ Todas las tareas completadas - Polling detenido");
    }
  }, [allTasksCompleted, requestIdToTrack]);

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

  useErrorFlag(showErrorFlag, errorMessage, "Error", false, 10000);

  const handleNextStep = () => {
    if (currentStep) {
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
    setShowErrorFlag(false);
    openSendModal();
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
    navigateAfterSubmission("vacations");
  };

  const handleCloseProcessingModal = () => {
    setShowErrorFlag(false);
    setShowProcessingModal(false);
    setRequestIdToTrack("");
    navigateAfterSubmission("vacations");
  };

  const isTablet = useMediaQuery("(max-width: 1100px)");

  const breadcrumbs = {
    label: labels.holidays.breadcrumbs.enjoyment,
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
        path: "/holidays/request-enjoyment",
        label: labels.holidays.breadcrumbs.enjoyment,
        id: "/holidays/request-enjoyment",
        isActive: true,
      },
    ],
    url: "/holidays",
  };

  const humanResourceRequestType = ERequestType.vacations_enjoyed;
  const humanResourceRequestDate = new Date().toISOString();

  return (
    <>
      <RequestEnjoymentUI
        appName={breadcrumbs.label}
        appRoute={breadcrumbs.crumbs}
        navigatePage={breadcrumbs.url}
        steps={requestEnjoymentSteps}
        currentStep={currentStep}
        isTablet={isTablet}
        isCurrentFormValid={isCurrentFormValid}
        generalInformationRef={generalInformationRef}
        initialGeneralInformationValues={formValues}
        humanResourceRequestType={humanResourceRequestType}
        humanResourceRequestDate={humanResourceRequestDate}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        handleFinishAssisted={handleFinishAssisted}
        setIsCurrentFormValid={setIsCurrentFormValid}
        setCurrentStep={setCurrentStep}
      />

      {modalState.isSendModalVisible && (
        <SendRequestModal
          descriptionText={labels.holidays.requestEnjoyment.confirmationMessage}
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

export { RequestEnjoyment };
