import { IEmployeeOptions } from "@ptypes/employeePortalBusiness.types";
import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { mapEmployeeOptionsApiToEntity } from "./mappers";

interface IGetOptionsParams {
  employeePortalId?: string;
  employeePortalPublicCode?: string;
  businessUnit?: string;
  businessUnitPublicCode?: string;
  page?: number;
  per_page?: number;
}

const getEmployeeOptions = async (
  params: IGetOptionsParams = {},
): Promise<IEmployeeOptions[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const url = new URL(
        `${environment.MOCKOON_SERVICE}/employee-portals-by-business-managers`,
      );
      const searchParams = new URLSearchParams();

      if (params.employeePortalId)
        searchParams.append("employeePortalId", params.employeePortalId);
      if (params.employeePortalPublicCode)
        searchParams.append(
          "employeePortalPublicCode",
          params.employeePortalPublicCode,
        );
      if (params.businessUnit)
        searchParams.append("businessUnit", params.businessUnit);
      if (params.businessUnitPublicCode)
        searchParams.append(
          "businessUnitPublicCode",
          params.businessUnitPublicCode,
        );
      searchParams.append("page", String(params.page ?? 1));
      searchParams.append("per_page", String(params.per_page ?? 50));

      url.search = searchParams.toString();

      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-Action": "SearchOptionsEmployeePortalByBusinessUnit",
          "Content-Type": "application/json; charset=UTF-8",
        },
        signal: controller.signal,
      };

      const res = await fetch(url.toString(), options);

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
    } catch {
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
