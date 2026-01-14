import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { Logger } from "@utils/logger";

import { IPendingVacationDays } from "./types";
import { isPendingVacationApi, mapPendingVacationApiToEntity } from "./mappers";

const getPendingVacationDaysByHumanResourceRequest = async (
  humanResourceRequestId: string,
  headers: Record<string, string>,
): Promise<IPendingVacationDays[]> => {
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
          "X-Action": "SearchForImmediateSupervisorByRequest",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/human-resources-requests/${humanResourceRequestId}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const raw = (await res.json().catch(() => null)) as unknown;

      if (!res.ok) {
        throw {
          message: "Error al consultar días pendientes de vacaciones",
          status: res.status,
          data: raw,
        };
      }

      if (Array.isArray(raw)) {
        const filtered = raw.filter(isPendingVacationApi);
        return filtered.map(mapPendingVacationApiToEntity);
      }

      if (isPendingVacationApi(raw)) {
        return [mapPendingVacationApiToEntity(raw)];
      }

      return [];
    } catch (_error) {
      Logger.error(
        "Error obteniendo días pendientes de vacaciones",
        _error instanceof Error ? _error : undefined,
        { humanResourceRequestId },
      );

      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener los días pendientes de vacaciones.",
        );
      }
    }
  }

  return [];
};

export { getPendingVacationDaysByHumanResourceRequest };
