import { IBusinessManagers } from "@src/types/employeePortalBusiness.types";
import {
  enviroment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { mapBusinessManagerApiToEntity } from "./mappers";

const businessManagers = async (
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
        `${enviroment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/business-managers/${businessManagerId}`,
        options,
      );

      clearTimeout(timeoutId);
      console.log("Estado de respuesta:", res.status);

      if (res.status === 204) {
        return {} as IBusinessManagers;
      }

      const data = await res.json();
      console.log("Datos recibidos:", data);

      if (!res.ok) {
        throw new Error(
          `Error al obtener los datos del operador: ${data?.message || "Unknown error"}`,
        );
      }

      return mapBusinessManagerApiToEntity(data);
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los datos del operador.",
        );
      }
    }
  }

  return {} as IBusinessManagers;
};

export { businessManagers };
