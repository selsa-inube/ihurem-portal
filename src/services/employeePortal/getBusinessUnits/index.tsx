import { IBusinessUnitsPortalEmployee } from "@ptypes/employeePortalBusiness.types";
import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { mapBusinessUnitsPortalEmployeeApiToEntity } from "./mappers";

const businessUnitsPortalEmployee = async (
  businessUnit: string,
): Promise<IBusinessUnitsPortalEmployee> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchByIdBusinessUnit",
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${environment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/businesses-unit/${businessUnit}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return {} as IBusinessUnitsPortalEmployee;
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los datos de la unidad de negocio.",
          status: res.status,
          data,
        };
      }

      return mapBusinessUnitsPortalEmployeeApiToEntity(data);
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los datos del operador.",
        );
      }
    }
  }

  return {} as IBusinessUnitsPortalEmployee;
};

export { businessUnitsPortalEmployee };
