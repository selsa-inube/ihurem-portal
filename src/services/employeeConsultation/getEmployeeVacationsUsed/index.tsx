import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { Logger } from "@utils/logger";

import { IVacationUsedResponse } from "./types";

interface IVacationUsedAPIResponse {
  vacationId: string;
  contractId: string;
  vacationType: string;
  startDateVacationEnjoyment: string;
  businessDaysOfVacation: number;
  confirmationDateOfEnjoyment: string;
  employeeId: string;
  earlyReturnDate?: string;
}

interface GetEmployeeVacationsUsedParams {
  page?: number;
  perPage?: number;
  contractId?: string;
  employeeId?: string;
}

const getEmployeeVacationsUsed = async (
  headers: Record<string, string>,
  params: GetEmployeeVacationsUsedParams = {},
): Promise<IVacationUsedResponse[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  const { page = 1, perPage = 50, contractId, employeeId } = params;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const queryParams = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });

      if (contractId) {
        queryParams.append("contractId", contractId);
      }
      if (employeeId) {
        queryParams.append("employeeId", employeeId);
      }

      const options: RequestInit = {
        method: "GET",
        headers: {
          ...headers,
          "X-Action": "SearchAllEmployeeVacation",
        },
        signal: controller.signal,
      };

      const url =
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}` +
        `/employee-vacations?${queryParams.toString()}`;

      const res = await fetch(url, options);

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data?.message ?? "Error al obtener las vacaciones utilizadas";
        throw new Error(errorMessage);
      }

      const vacationsUsed: IVacationUsedResponse[] = Array.isArray(data)
        ? data.map((item: IVacationUsedAPIResponse) => ({
            businessDayOfVacation: String(item.businessDaysOfVacation ?? 0),
            confirmationDateOfEmployment: String(
              item.confirmationDateOfEnjoyment ?? "",
            ),
            contractId: String(item.contractId ?? ""),
            earlyReturnDate: String(item.earlyReturnDate ?? ""),
            startDateVacationEmployment: String(
              item.startDateVacationEnjoyment ?? "",
            ),
            vacationId: String(item.vacationId ?? ""),
            vacationType: String(item.vacationType ?? ""),
            employeeId: String(item.employeeId ?? ""),
          }))
        : [];

      return vacationsUsed;
    } catch (error) {
      if (attempt === maxRetries) {
        Logger.error(
          "Error obteniendo vacaciones utilizadas",
          error instanceof Error ? error : undefined,
          { page, perPage, contractId, employeeId },
        );
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(
          `Todos los intentos fallaron. No se pudieron obtener las vacaciones utilizadas.`,
        );
      }
    }
  }

  return [];
};

export { getEmployeeVacationsUsed };
export type { IVacationUsedResponse, GetEmployeeVacationsUsedParams };
