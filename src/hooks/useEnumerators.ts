import { useState, useEffect } from "react";

import {
  EnumeratorItem,
  getEnumerators,
} from "@services/enumerators/getEnumerators";
import { useAppContext } from "@context/AppContext/useAppContext";

import { useErrorFlag } from "./useErrorFlag";

export const useEnumerators = <T>(
  enumeratorName: string,
  formatData?: (data: EnumeratorItem[]) => T[],
) => {
  const [data, setData] = useState<T[]>([]);
  const [rawData, setRawData] = useState<EnumeratorItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [flagShown, setFlagShown] = useState(false);

  const { businessUnit } = useAppContext();

  useErrorFlag(
    flagShown,
    `Error al obtener enumerador "${enumeratorName}"`,
    "Error en la solicitud",
    false,
  );

  const fetchData = async () => {
    if (!enumeratorName) return;

    setIsLoading(true);
    setFlagShown(false);

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
      setFlagShown(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [enumeratorName]);

  return { data, rawData, isLoading, error, refetch: fetchData };
};
