import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { Logger } from "@utils/logger";
import { EmployeeContractAggregate } from "@ptypes/employeeContractAggregate";
import { mapEmployeeContractApiToEntity } from "./mappers";

interface GetEmployeeContractsParams {
  page?: number;
  perPage?: number;
  businessUnit: string;
  employeeId: string;
}

const getEmployeeContracts = async ({
  page = 1,
  perPage = 50,
  businessUnit,
  employeeId,
}: GetEmployeeContractsParams): Promise<EmployeeContractAggregate[]> => {
  if (!businessUnit) {
    throw new Error("Falta el header X-Business-Unit");
  }

  if (!employeeId) {
    throw new Error("Falta el employeeId");
  }

  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "X-Action": "SearchAllEmployeeContracts",
    "X-Business-Unit": businessUnit,
  };

  const queryParams = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    employeeId: String(employeeId),
  }).toString();

  for (let attempt = 1; attempt <= maxRetriesServices; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        fetchTimeoutServices,
      );

      const res = await fetch(
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/employee-contracts?${queryParams}`,
        {
          method: "GET",
          headers,
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Error al obtener contratos: ${res.status} - ${errorText}`,
        );
      }

      const data = await res.json();

      Logger.info("[EmployeeContracts] respuesta API", data);

      return (data as Record<string, unknown>[]).map(
        mapEmployeeContractApiToEntity,
      );
    } catch (error) {
      Logger.warn(`Intento ${attempt} fallido al obtener contratos`, {
        businessUnit,
        employeeId,
        attempt,
        error:
          error instanceof Error
            ? { name: error.name, message: error.message }
            : error,
      });

      if (attempt === maxRetriesServices) {
        throw error;
      }
    }
  }

  throw new Error("Error inesperado al obtener contratos");
};

export { getEmployeeContracts };
