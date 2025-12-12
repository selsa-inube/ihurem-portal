import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";

import { Logger } from "@utils/logger";
import { EmployeeAbsence } from "@ptypes/employeeAbsence.types";

import { mapEmployeeAbsenceApiToEntity } from "./mappers";

const getEmployeeAbsences = async (
  employeeId: string,
  headers: Record<string, string>,
  page = 1,
  perPage = 50,
): Promise<EmployeeAbsence[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const queryParameters = new URLSearchParams({
        employeeId,
        page: String(page),
        per_page: String(perPage),
      });

      const res = await fetch(
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/employee-absences?${queryParameters}`,
        {
          method: "GET",
          headers: {
            "X-Action": "SearchAllEmployeeAbsence",
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
          `Error al obtener las ausencias del empleado (Status: ${res.status})`;
        throw new Error(errorMessage);
      }

      const data = await res.json();

      return Array.isArray(data)
        ? data.map((item) => mapEmployeeAbsenceApiToEntity(item))
        : [];
    } catch (error) {
      if (attempt === maxRetries) {
        Logger.error(
          "Error al obtener las ausencias del empleado",
          error as Error,
          {
            employeeId,
            page,
            perPage,
          },
        );

        if (error instanceof Error) {
          throw error;
        }

        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener las ausencias del empleado.",
        );
      }
    }
  }

  return [];
};

export { getEmployeeAbsences };
