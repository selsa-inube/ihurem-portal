import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";

import { IVacationDaysResponse } from "./types";

const getEmployeeVacationDays = async (
  employeeId: string,
  headers: Record<string, string>,
): Promise<IVacationDaysResponse[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const options: RequestInit = {
        method: "GET",
        headers: {
          ...headers,
          "X-Action": "SearchDaysPendingPerContractByEmployee",
        },
        signal: controller.signal,
      };

      const url =
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}` +
        `/employees/${encodeURIComponent(employeeId)}`;

      const res = await fetch(url, options);

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      const data = await res.json();

      if (!res.ok) {
        throw {
          message: "Error al obtener los días de vacaciones pendientes",
          status: res.status,
          data,
        };
      }

      const vacationDays: IVacationDaysResponse[] = Array.isArray(data)
        ? data.map((item: IVacationDaysResponse) => ({
            businessName: String(item.businessName || ""),
            contractId: String(item.contractId || ""),
            contractNumber: String(item.contractNumber || ""),
            contractStatus: String(item.contractStatus || ""),
            contractType: String(item.contractType || ""),
            pendingDays: Number(item.pendingDays || 0),
          }))
        : [];

      return vacationDays;
    } catch (error) {
      if (attempt === maxRetries) {
        console.log(error);
        throw new Error(
          `Todos los intentos fallaron. No se pudieron obtener los días de vacaciones pendientes para el empleado ${employeeId}.`,
        );
      }
    }
  }

  return [];
};

export { getEmployeeVacationDays };
export type { IVacationDaysResponse };
