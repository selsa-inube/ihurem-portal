import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";

import { IBusinessManagers } from "@ptypes/employeePortalBusiness.types";

import { mapBusinessManagerApiToEntity } from "./mappers";

const getBusinessManagers = async (
  headers: Record<string, string>,
  publicCode: string,
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
          ...headers,
          "X-Action": "SearchAllBusinessManager",
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const url = `${environment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/business-managers?publicCode=${publicCode}`;

      const res = await fetch(url, options);

      clearTimeout(timeoutId);

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data?.message ?? "Error al obtener el business manager";
        throw new Error(errorMessage);
      }

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error(
          "No se encontró ningún business manager para el publicCode dado.",
        );
      }

      return mapBusinessManagerApiToEntity(data[0]);
    } catch (error) {
      if (attempt === maxRetries) {
        if (error instanceof Error) throw error;
        throw new Error(
          "Todos los intentos fallaron obteniendo el business manager.",
        );
      }
    }
  }

  throw new Error("Error inesperado obteniendo el business manager.");
};

export { getBusinessManagers };
