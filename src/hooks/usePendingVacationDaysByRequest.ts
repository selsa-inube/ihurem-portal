import { useEffect, useRef, useState, useCallback } from "react";

import { getPendingVacationDaysByHumanResourceRequest } from "@services/employeeConsultation/getPendingVacationDaysByHumanResourceRequest";
import { IPendingVacationDays } from "@services/employeeConsultation/getPendingVacationDaysByHumanResourceRequest/types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { useHeaders } from "@hooks/useHeaders";
import { Logger } from "@utils/logger";

const ERROR_CODE_GET_PENDING_VACATION_DAYS = 1025;

export const usePendingVacationDaysByRequest = (
  humanResourceRequestId: string,
) => {
  const [data, setData] = useState<IPendingVacationDays[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { showErrorModal } = useErrorModal();
  const { getHeaders } = useHeaders();

  const hasFetchedRef = useRef<string | null>(null);
  const hasShownErrorRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (!humanResourceRequestId) return;
    setIsLoading(true);
    setError(false);

    try {
      const headers = await getHeaders(true);
      const result = await getPendingVacationDaysByHumanResourceRequest(
        humanResourceRequestId,
        headers,
      );
      setData(result);

      if (!result || result.length === 0) {
        setError(true);
        if (!hasShownErrorRef.current) {
          hasShownErrorRef.current = true;
          const errorConfig =
            modalErrorConfig[ERROR_CODE_GET_PENDING_VACATION_DAYS];
          showErrorModal({
            ...errorConfig,
            redirectOnClose: true,
          });
        }
      }
    } catch (err) {
      setError(true);
      Logger.error(
        "Error obteniendo días pendientes de vacaciones",
        err instanceof Error ? err : undefined,
        { humanResourceRequestId },
      );

      if (!hasShownErrorRef.current) {
        hasShownErrorRef.current = true;
        const errorConfig =
          modalErrorConfig[ERROR_CODE_GET_PENDING_VACATION_DAYS];
        showErrorModal({
          ...errorConfig,
          descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
          redirectOnClose: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [humanResourceRequestId, getHeaders, showErrorModal]);

  useEffect(() => {
    if (!humanResourceRequestId) return;
    if (hasFetchedRef.current === humanResourceRequestId) return;
    hasFetchedRef.current = humanResourceRequestId;
    fetchData();
  }, [humanResourceRequestId, fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};
