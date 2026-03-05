import { IBusinessUnitsPortalEmployee } from "@ptypes/employeePortalBusiness.types";
import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { mapBusinessUnitsPortalEmployeeToEntities } from "./mappers";

const businessUnitsPortalEmployee = async (
  headers: Record<string, string>,
  publicCode?: string,
): Promise<IBusinessUnitsPortalEmployee[]> => {
  for (let attempt = 1; attempt <= maxRetriesServices; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        fetchTimeoutServices,
      );

      const url = new URL(
        `${environment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/businesses-unit`,
      );

      if (publicCode) {
        url.searchParams.append("publicCode", publicCode);
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          ...headers,
          "X-Action": "SearchAllBusinessUnit",
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 204) {
        return [];
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ?? "Error obteniendo unidades de negocio",
        );
      }

      return mapBusinessUnitsPortalEmployeeToEntities(data);
    } catch (error) {
      if (attempt === maxRetriesServices) {
        throw error instanceof Error
          ? error
          : new Error("Todos los intentos fallaron obteniendo business units");
      }
    }
  }

  return [];
};

export { businessUnitsPortalEmployee };
