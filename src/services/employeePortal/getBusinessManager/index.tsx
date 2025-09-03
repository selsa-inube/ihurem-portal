import { fetchTimeoutServices, maxRetriesServices } from "@config/environment";
import { IBusinessManagers } from "@ptypes/employeePortalBusiness.types";

import { mapBusinessManagerApiToEntity } from "./mappers";

const getBusinessManagers = async (
  businessManagerId: string,
): Promise<IBusinessManagers> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchByIdBusinessManager",
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `http://172.106.48.22:8020/isaas-query-process-service/api/business-managers/${businessManagerId}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return {} as IBusinessManagers;
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los datos del operador",
          status: res.status,
          data,
        };
      }

      return mapBusinessManagerApiToEntity(data);
    } catch (error) {
      console.log(error);
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los datos del operador.",
        );
      }
    }
  }

  return {} as IBusinessManagers;
};

export { getBusinessManagers };
