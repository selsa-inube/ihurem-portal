import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { Employee } from "@ptypes/employeePortalConsultation.types";

import { mapEmployeeApiToEntity } from "../mappers";

const getEmployeeById = async (
  employeeId: string,
  headers: Record<string, string>,
): Promise<Employee> => {
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
          "X-Action": "SearchByIdEmployee",
        },
        signal: controller.signal,
      };
      const url =
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}` +
        `/employees/${encodeURIComponent(employeeId)}`;

      const res = await fetch(url, options);

      clearTimeout(timeoutId);

      if (res.status === 204) {
        throw new Error(`El empleado con ID ${employeeId} no existe.`);
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData?.message ??
          `Error al obtener el empleado ${employeeId}: ${res.status}`;
        throw new Error(errorMessage);
      }

      const data = await res.json();
      return mapEmployeeApiToEntity(data);
    } catch (err) {
      if (attempt === maxRetries) {
        if (err instanceof Error) {
          throw err;
        }
        throw new Error(
          `No se pudo obtener el empleado después de ${maxRetries} intentos.`,
        );
      }

      console.warn(`Intento ${attempt} falló, reintentando...`);
    }
  }
  throw new Error(`No se pudo obtener el empleado ${employeeId}.`);
};

export { getEmployeeById };
