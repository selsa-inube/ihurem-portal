import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { EmployeeContractAggregate } from "@ptypes/employeeContractAggregate";
import { mapEmployeeContractApiToEntity } from "./mappers";
import { Logger } from "@utils/logger";

interface GetEmployeeContractsParams {
  page?: number;
  perPage?: number;
  businessUnit: string;
}

const getEmployeeContracts = async ({
  page = 1,
  perPage = 50,
  businessUnit,
}: GetEmployeeContractsParams): Promise<EmployeeContractAggregate[]> => {
  if (!businessUnit) {
    throw new Error("Falta el header X-Business-Unit");
  }

  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "X-Action": "SearchAllEmployeeContracts",
    "X-Business-Unit": businessUnit,
  };

  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  const queryParams = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  }).toString();

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

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
          `Error al obtener los contratos del empleado: ${res.status} - ${errorText}`,
        );
      }

      const data = await res.json();
      return (data as Record<string, unknown>[]).map(
        mapEmployeeContractApiToEntity,
      );
    } catch (error) {
      Logger.warn(`Intento ${attempt} fallido al obtener contratos`, {
        businessUnit,
        attempt,
        error:
          error instanceof Error
            ? { name: error.name, message: error.message }
            : error,
      });

      if (attempt === maxRetries) {
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los contratos.",
        );
      }
    }
  }

  throw new Error("Error inesperado al obtener contratos");
};

export { getEmployeeContracts };
