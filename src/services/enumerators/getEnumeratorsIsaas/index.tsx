import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";
import { Logger } from "@utils/logger";

import { IEnumeratorItem } from "../types";

const getEnumeratorsIsaas = async (
  enumeratorName: string,
  headers: Record<string, string>,
): Promise<IEnumeratorItem[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const queryParameters = new URLSearchParams({
        country: environment.COUNTRY,
      });

      const res = await fetch(
        `${environment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/enumerators/${enumeratorName}?${queryParameters}`,
        {
          method: "GET",
          headers: {
            "X-Action": "GetEnum",
            ...headers,
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData?.message ??
          `Error al obtener el enumerador ${enumeratorName} (Status: ${res.status})`;
        throw new Error(errorMessage);
      }

      const data = await res.json();

      return Array.isArray(data) ? data : [];
    } catch (error) {
      if (attempt === maxRetries) {
        Logger.error(
          `Error al obtener el enumerador ${enumeratorName}`,
          error as Error,
          {
            enumeratorName,
          },
        );
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(
          `Todos los intentos fallaron. No se pudo obtener el enumerador ${enumeratorName}.`,
        );
      }
    }
  }

  return [];
};

export { getEnumeratorsIsaas };
