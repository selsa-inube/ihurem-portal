import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";

interface EnumeratorItem {
  id: string;
  name: string;
  description: string;
  code: string;
}

const getEnumerators = async (
  enumeratorName: string,
  headers: Record<string, string>,
): Promise<EnumeratorItem[]> => {
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
        `http://172.106.48.22:8020/isaas-query-process-service/api/enumerators/${enumeratorName}?${queryParameters}`,
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
        throw new Error(
          `Error al obtener el enumerador ${enumeratorName} (Status: ${res.status})`,
        );
      }

      const data = await res.json();

      return Array.isArray(data) ? data : [];
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(
          `Error al obtener el enumerador ${enumeratorName}:`,
          error,
        );
        throw new Error(
          `Todos los intentos fallaron. No se pudo obtener el enumerador ${enumeratorName}.`,
        );
      }
    }
  }

  return [];
};

export { getEnumerators };
export type { EnumeratorItem };
