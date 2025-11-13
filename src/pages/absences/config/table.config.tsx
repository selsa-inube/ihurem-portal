import {
  HumanResourceRequest,
  ERequestStatus,
  IUnifiedHumanResourceRequestData,
} from "@ptypes/humanResourcesRequest.types";
import { IAbsencesProcedureTable } from "../components/AbsencesProcedureTable/types";
import { formatDate } from "@utils/date";

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
      console.warn("Error al parsear humanResourceRequestData:", error);
    }

    return {
      reason: { value: item.humanResourceRequestDescription ?? "Sin motivo" },
      date: { value: formatDate(item.humanResourceRequestDate) },
      duration: {
        value: parsedData?.daysOff ? `${parsedData.daysOff} días` : "-",
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
        },
      },
      view: {
        value: "Ver",
        type: "icon",
        onClick: () =>
          console.log("Ver detalle de solicitud:", item.humanResourceRequestId),
      },
      download: {
        value: "Descargar",
        type: "icon",
        onClick: () =>
          console.log("Descargar solicitud:", item.humanResourceRequestId),
      },
    };
  });
};
