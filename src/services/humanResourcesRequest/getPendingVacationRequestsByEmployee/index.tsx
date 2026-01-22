import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";
import { Logger } from "@utils/logger";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { mapHumanResourceRequestApiToEntity } from "../getHumanResourcesRequest/mappers";

const getPendingVacationRequestsByEmployee = async (
  employeeId: string,
  headers: Record<string, string>,
): Promise<HumanResourceRequest[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const res = await fetch(
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/human-resources-requests/${employeeId}/vacation-requests-pending`,
        {
          method: "GET",
          headers: {
            "X-Action": "SearchVacationRequestsPendingByEmployee",
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
          `Error al obtener las vacaciones en trámite (Status: ${res.status})`;
        throw new Error(errorMessage);
      }

      const data = await res.json();

      return Array.isArray(data)
        ? data.map(mapHumanResourceRequestApiToEntity)
        : [];
    } catch (error) {
      if (attempt === maxRetries) {
        Logger.error(
          "Error al obtener las vacaciones en trámite por empleado",
          error as Error,
          { employeeId, attempt },
        );

        if (error instanceof Error) {
          throw error;
        }

        throw new Error(
          "No se pudieron obtener las vacaciones en trámite del empleado.",
        );
      }
    }
  }

  return [];
};

export { getPendingVacationRequestsByEmployee };
