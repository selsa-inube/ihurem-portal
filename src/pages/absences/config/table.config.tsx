import {
  HumanResourceRequest,
  ERequestStatus,
  EAbsenceReason,
  absenceReasonLabels,
  IUnifiedHumanResourceRequestData,
} from "@ptypes/humanResourcesRequest.types";
import { formatDate } from "@utils/date";
import { Logger } from "@utils/logger";

import { IAbsencesProcedureTable } from "../components/AbsencesProcedureTable/types";

export const formatAbsenceRequests = (
  requests: HumanResourceRequest[],
): IAbsencesProcedureTable[] => {
  return requests.map((item) => {
    let parsedData: IUnifiedHumanResourceRequestData =
      {} as IUnifiedHumanResourceRequestData;

    try {
      parsedData =
        typeof item.humanResourceRequestData === "string"
          ? JSON.parse(item.humanResourceRequestData)
          : (item.humanResourceRequestData ?? {});
    } catch (error) {
      Logger.error(
        "Error al parsear humanResourceRequestData",
        error as Error,
        {
          humanResourceRequestId: item.humanResourceRequestId,
        },
      );
    }

    const formattedReason = (() => {
      const code = parsedData.subReason ?? parsedData.reason;

      if (!code) return "Sin motivo";
      return (
        absenceReasonLabels[code as EAbsenceReason] ?? code.replace(/_/g, " ")
      );
    })();

    return {
      reason: { value: formattedReason },
      date: { value: formatDate(item.humanResourceRequestDate) },
      duration: {
        value: parsedData.durationOfDays
          ? `${parsedData.durationOfDays} días`
          : "-",
      },
      state: {
        value:
          ERequestStatus[
            item.humanResourceRequestStatus as unknown as keyof typeof ERequestStatus
          ] ?? "En trámite",
      },

      dataDetails: {
        value: {
          humanResourceRequestId: item.humanResourceRequestId,
          humanResourceRequestNumber: item.humanResourceRequestNumber,
          humanResourceRequestDate: formatDate(item.humanResourceRequestDate),
          humanResourceRequestDescription:
            item.humanResourceRequestDescription ?? "Sin descripción",
          humanResourceRequestData: {
            ...parsedData,
            reason: parsedData.reason,
          },
        },
      },
      view: {
        value: "Ver",
        type: "icon",
        onClick: () =>
          Logger.info("Ver detalle de solicitud", {
            humanResourceRequestId: item.humanResourceRequestId,
          }),
      },
      download: {
        value: "Descargar",
        type: "icon",
        onClick: () =>
          Logger.info("Descargar solicitud", {
            humanResourceRequestId: item.humanResourceRequestId,
          }),
      },
    };
  });
};
