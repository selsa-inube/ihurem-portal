import { IEmployee } from "@ptypes/employeePortalBusiness.types";
import {
  enviroment,
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
          "X-Action": "SearchByNickname",
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/employee/${nickname}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return {} as IEmployee;
      }
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw {
          message: "Error al obtener los datos del empleado.",
          status: res.status,
          data,
        };
      }

      return mapEmployeeApiToEntity(data);
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los datos del empleado.",
        );
      }
    }
  }

  return {} as IEmployee;
};

export { employeeByNickname };
