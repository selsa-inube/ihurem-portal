import { IEmployeeOptions } from "@ptypes/employeePortalBusiness.types";
import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { mapEmployeeOptionsApiToEntity } from "./mappers";

const getEmployeeOptions = async (
  employeeId: string,
): Promise<IEmployeeOptions[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchAllCatalogOfOptionsForEmployeePortals",
          "Content-Type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const url = `${environment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/catalog-of-options-for-employee-portals`;

      const res = await fetch(url, options);

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener las opciones del empleado",
          status: res.status,
          data,
        };
      }

      return mapEmployeeOptionsApiToEntity(data);
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener las opciones del empleado.",
        );
      }
    }
  }

  return [];
};

export { getEmployeeOptions };
