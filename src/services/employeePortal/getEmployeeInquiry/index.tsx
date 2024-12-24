import { IEmployee } from "@ptypes/employeePortalBusiness.types";
import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { mapEmployeeApiToEntity } from "./mappers";

const employeeByNickname = async (nickname: string): Promise<IEmployee> => {
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
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${environment.IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/employee/${nickname}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return {} as IEmployee;
      }

      const data = (await res.json()) as IEmployee;

      if (!res.ok) {
        throw new Error(
          `Error al obtener los datos del empleado. Status: ${res.status}, Detalles: ${JSON.stringify(data)}`,
        );
      }
      const normalizedEmployee = Array.isArray(data)
        ? mapEmployeeApiToEntity(data[0])
        : ({} as IEmployee);

      return normalizedEmployee;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los datos del empleado.",
        );
      }
      console.warn(`Intento ${attempt} fallido:`, error);
    }
  }

  return {} as IEmployee;
};

export { employeeByNickname };
