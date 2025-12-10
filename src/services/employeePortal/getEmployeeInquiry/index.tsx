import { IEmployee } from "@ptypes/employeePortalBusiness.types";
import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";

import { Logger } from "@utils/logger";

import { mapEmployeeApiToEntity } from "./mappers";

const employeeByIdentification = async (
  identificationType: string,
  identificationNumber: string,
  businessUnits: string,
): Promise<IEmployee> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "X-Action": "SearchAllEmployee",
          "X-Business-Unit": businessUnits,
        },
        signal: controller.signal,
      };

      const url = `${environment.IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/employees?identificationDocumentNumber=${identificationNumber}&identificationType=${identificationType}`;

      const res = await fetch(url, options);

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return {} as IEmployee;
      }

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data?.message ??
          `Error al obtener los datos del empleado. Status: ${res.status}`;
        throw new Error(errorMessage);
      }

      const normalizedEmployee = Array.isArray(data)
        ? mapEmployeeApiToEntity(data[0])
        : ({} as IEmployee);
      return normalizedEmployee;
    } catch (error) {
      if (attempt === maxRetries) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error(String(error));
      }

      Logger.warn(`Intento ${attempt} fallido al obtener empleado`, {
        identificationType,
        identificationNumber,
        businessUnits,
        attempt,
        error:
          error instanceof Error
            ? { name: error.name, message: error.message }
            : error,
      });
    }
  }

  return {} as IEmployee;
};

export { employeeByIdentification };
