import { useState, useEffect } from "react";

import { getEnumeratorsIsaas } from "@services/enumerators/getEnumeratorsIsaas";
import { IEnumeratorItem } from "@services/enumerators/types";
import { useAppContext } from "@context/AppContext/useAppContext";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_GET_ENUMERATORS_FAILED = 1021;

export const useEnumeratorsIsaas = <T>(
  enumeratorName: string,
  formatData?: (data: IEnumeratorItem[]) => T[],
) => {
  const [data, setData] = useState<T[]>([]);
  const [rawData, setRawData] = useState<IEnumeratorItem[]>([]);
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

      const enumeratorData = await getEnumeratorsIsaas(enumeratorName, headers);

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
