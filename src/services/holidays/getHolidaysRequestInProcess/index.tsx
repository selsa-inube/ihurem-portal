import { fetchTimeoutServices, maxRetriesServices } from "@config/environment";
import { IHolidaysInProcess } from "@src/types/holidays.types";

import { mapHolidaysInProcessApiToEntities } from "./mappers";

const getHolidaysRequestInProcess = async (): Promise<IHolidaysInProcess[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `http://localhost:3001/ihurem-query-process-service/api/vacation-history`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener el historial de vacaciones",
          status: res.status,
          data,
        };
      }

      const normalizedHolidaysInProcess = Array.isArray(data)
        ? mapHolidaysInProcessApiToEntities(data)
        : [];

      return normalizedHolidaysInProcess;
    } catch (error) {
      if (attempt === maxRetries) {
        console.error("Error al obtener las solicitudes de vacaciones:", error);
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener el historial de vacaciones.",
        );
      }
    }
  }

  return [];
};

export { getHolidaysRequestInProcess };
