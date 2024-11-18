import {
  enviroment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IEmployeePortalByBusinessManager } from "@src/types/employeePortalBusiness.types";
import { mapEmployeePortalByBusinessManagerApiToEntities } from "./mappers";

const employeePortalByBusinessManager = async (
  codeParame: string,
): Promise<IEmployeePortalByBusinessManager> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        portalCode: codeParame,
      });
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-Action": "SearchAllEmployeePortalsByBusinessManager",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/employee-portals-by-business-managers?${queryParams.toString()}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return {} as IEmployeePortalByBusinessManager;
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los datos del portal",
          status: res.status,
          data,
        };
      }

      const normalizedEmployeePortal = Array.isArray(data)
        ? mapEmployeePortalByBusinessManagerApiToEntities(data)
        : [];

      return normalizedEmployeePortal[0];
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los datos del portal.",
        );
      }
    }
  }

  return {} as IEmployeePortalByBusinessManager;
};

export { employeePortalByBusinessManager };
