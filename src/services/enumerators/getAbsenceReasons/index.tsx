import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";
import { Logger } from "@utils/logger";

import { IAbsenceReason, IGetAbsenceReasonsParams } from "./types";

const getAbsenceReasons = async (
  params: IGetAbsenceReasonsParams,
  headers: Record<string, string>,
): Promise<IAbsenceReason[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const res = await fetch(
        `${environment.IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/employee-absences/by-reason/${params.regulatoryFramework}/${params.company}`,
        {
          method: "GET",
          headers: {
            "X-Action": "SearchByReasonForAbsences",
            ...headers,
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData?.message ??
          `Error al obtener las razones de ausencia (Status: ${res.status})`;
        throw new Error(errorMessage);
      }

      const data = await res.json();

      return Array.isArray(data) ? data : [];
    } catch (error) {
      if (attempt === maxRetries) {
        Logger.error(
          "Error al obtener las razones de ausencia",
          error as Error,
          {
            regulatoryFramework: params.regulatoryFramework,
            company: params.company,
          },
        );
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener las razones de ausencia.",
        );
      }
    }
  }

  return [];
};

export { getAbsenceReasons };
