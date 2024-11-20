import { IBusinessUnitsPortalEmployee } from "@ptypes/employeePortalBusiness.types";
import {
  enviroment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { mapBusinessUnitsPortalStaffToEntities } from "./mappers";

const businessUnitsPortalStaff = async (
  portalPublicCode: string,
  userAccount: string,
): Promise<IBusinessUnitsPortalEmployee[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchAllBusinessUnit",
          "Content-type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(
        `${enviroment.IPORTAL_STAFF_QUERY_PROCESS_SERVICE}/business-units-portal-staff/${userAccount}/${portalPublicCode}`,
        options,
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los datos del operador",
          status: res.status,
          data,
        };
      }

      const normalizedBusineesUnits = Array.isArray(data)
        ? mapBusinessUnitsPortalStaffToEntities(data)
        : [];

      return normalizedBusineesUnits;
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los datos del operador.",
        );
      }
    }
  }

  return [];
};

export { businessUnitsPortalStaff };
