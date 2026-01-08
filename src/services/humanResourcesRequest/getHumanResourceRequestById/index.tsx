import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";

import { Logger } from "@utils/logger";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";

import { mapHumanResourceRequestApiToEntity } from "./mappers";

const getHumanResourceRequestById = async (
  humanResourceRequestId: string,
  headers: Record<string, string>,
): Promise<HumanResourceRequest> => {
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
          "X-Action": "SearchByIdHumanResourcesRequest",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/human-resources-requests/${humanResourceRequestId}`,
        options,
      );

      clearTimeout(timeoutId);

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al consultar la solicitud de recursos humanos",
          status: res.status,
          data,
        };
      }

      return mapHumanResourceRequestApiToEntity(data);
    } catch (_error) {
      Logger.error(
        "Error al consultar la solicitud de recursos humanos",
        _error instanceof Error ? _error : undefined,
        { humanResourceRequestId },
      );

      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener la solicitud de recursos humanos.",
        );
      }
    }
  }

  throw new Error("Error inesperado");
};

export { getHumanResourceRequestById };
