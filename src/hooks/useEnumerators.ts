import { useState, useEffect } from "react";

import {
  EnumeratorItem,
  getEnumerators,
} from "@services/enumerators/getEnumerators";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_GET_ENUMERATORS_FAILED = 1021;

export const useEnumerators = <T>(
  enumeratorName: string,
  formatData?: (data: EnumeratorItem[]) => T[],
) => {
  const [data, setData] = useState<T[]>([]);
  const [rawData, setRawData] = useState<EnumeratorItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { businessUnit } = useAppContext();
  const { showErrorModal } = useErrorModal();

  const fetchData = async () => {
    if (!enumeratorName) return;

    setIsLoading(true);

    try {
      const headers = {
        "Content-type": "application/json; charset=UTF-8",
        "X-Business-unit": businessUnit.publicCode,
      };

      const enumeratorData = await getEnumerators(enumeratorName, headers);

      const responseData = enumeratorData ?? [];
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
      const errorConfig = modalErrorConfig[ERROR_CODE_GET_ENUMERATORS_FAILED];
      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
        solutionText: errorConfig.solutionText,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [enumeratorName]);

  return { data, rawData, isLoading, error, refetch: fetchData };
};
