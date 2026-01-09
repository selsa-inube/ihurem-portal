import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";

import { HumanResourceTaskExecution } from "@ptypes/humanResourcesTaskExecution.types";
import { mapTaskExecutionApiToEntity } from "./mappers";
import { Logger } from "@utils/logger";

const getHumanResourceRequestTaskExecutionMode = async (
  humanResourceRequestId: string,
  headers: Record<string, string>,
): Promise<HumanResourceTaskExecution[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          ...headers,
          "X-Action": "SearchForRequestTaskExecutionMode",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/human-resources-requests/${humanResourceRequestId}/task`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message:
            "Error al consultar el modo de ejecución de las tareas de la solicitud",
          status: res.status,
          data,
        };
      }

      return data.map(mapTaskExecutionApiToEntity);
    } catch (_error) {
      Logger.error(
        "Error obteniendo modo de ejecución",
        _error instanceof Error ? _error : undefined,
        { humanResourceRequestId },
      );

      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener el modo de ejecución de las tareas.",
        );
      }
    }
  }

  return [];
};

export { getHumanResourceRequestTaskExecutionMode };
