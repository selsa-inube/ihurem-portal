import { useEffect, useRef, useState } from "react";

import { HumanResourceTaskExecution } from "@ptypes/humanResourcesTaskExecution.types";
import { getHumanResourceRequestTaskExecutionMode } from "@services/employeeConsultation/humanResourcesTaskExecution";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { useHeaders } from "@hooks/useHeaders";
import { Logger } from "@utils/logger";

const ERROR_CODE_GET_TASK_EXECUTION = "1007";

export const useTaskExecutionMode = (humanResourceRequestId: string) => {
  const [tasks, setTasks] = useState<HumanResourceTaskExecution[]>([]);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { showErrorModal } = useErrorModal();
  const { getHeaders } = useHeaders();

  const hasFetchedRef = useRef<string | null>(null);
  const hasShownErrorRef = useRef(false);

  useEffect(() => {
    if (!humanResourceRequestId) return;

    if (hasFetchedRef.current === humanResourceRequestId) return;
    hasFetchedRef.current = humanResourceRequestId;

    const fetchTaskExecutionMode = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const headers = await getHeaders(true);

        const result = await getHumanResourceRequestTaskExecutionMode(
          humanResourceRequestId,
          headers,
        );

        setTasks(result);

        if (result.length === 0) {
          setIsAutomatic(false);
          setIsManual(false);
          return;
        }

        const allAutomatic = result.every(
          (task) => task.methodOfExecution?.toUpperCase() === "AUTOMATIC",
        );

        const allManual = result.every(
          (task) => task.methodOfExecution?.toUpperCase() === "MANUAL",
        );

        setIsAutomatic(allAutomatic);
        setIsManual(allManual);
      } catch (_error) {
        setError(true);

        Logger.error(
          "Error obteniendo modo de ejecución",
          _error instanceof Error ? _error : undefined,
          { humanResourceRequestId },
        );

        if (!hasShownErrorRef.current) {
          hasShownErrorRef.current = true;

          showErrorModal({
            ...modalErrorConfig[ERROR_CODE_GET_TASK_EXECUTION],
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskExecutionMode();
  }, [humanResourceRequestId, getHeaders, showErrorModal]);

  return {
    tasks,
    isAutomatic,
    isManual,
    isLoading,
    error,
  };
};
