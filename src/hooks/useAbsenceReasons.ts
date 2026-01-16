import { useState, useEffect } from "react";

import {
  IAbsenceReason,
  IGetAbsenceReasonsParams,
} from "@services/enumerators/getAbsenceReasons/types";
import { getAbsenceReasons } from "@services/enumerators/getAbsenceReasons";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { useHeaders } from "@hooks/useHeaders";

const ERROR_CODE_GET_ABSENCE_REASONS_FAILED = 1021;

export const useAbsenceReasons = <T>(
  params: IGetAbsenceReasonsParams,
  formatData?: (data: IAbsenceReason[]) => T[],
) => {
  const [data, setData] = useState<T[]>([]);
  const [rawData, setRawData] = useState<IAbsenceReason[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { getHeaders } = useHeaders();

  const { showErrorModal } = useErrorModal();

  const fetchData = async () => {
    if (!params?.regulatoryFramework || !params?.company) return;

    setIsLoading(true);

    try {
      const headers = await getHeaders();
      const absenceReasonsData = await getAbsenceReasons(params, headers);

      const responseData = absenceReasonsData ?? [];
      setRawData(responseData);

      if (formatData) {
        setData(formatData(responseData));
      } else {
        setData(responseData as T[]);
      }

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData([]);
      setRawData([]);
      const errorConfig =
        modalErrorConfig[ERROR_CODE_GET_ABSENCE_REASONS_FAILED];
      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
        solutionText: errorConfig.solutionText,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params?.regulatoryFramework && params?.company) {
      fetchData();
    }
  }, [params?.regulatoryFramework, params?.company]);

  return { data, rawData, isLoading, error, refetch: fetchData };
};
