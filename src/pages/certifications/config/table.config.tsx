import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import { formatDate } from "@utils/date";
import {
  ERequestType,
  ERequestStatus,
  HumanResourceRequest,
} from "@ptypes/humanResourcesRequest.types";
import { parseDataSafely, getValueFromData } from "@utils/parser";

import { ICertificationsTable } from "../components/CertificationsTable/types";

export const formatHumanResourceData = (
  requests: HumanResourceRequest[],
): ICertificationsTable[] =>
  requests.map((request) => {
    const parsedData = parseDataSafely(request.humanResourceRequestData);

    return {
      requestId: request.humanResourceRequestId,
      requestNumber: { value: request.humanResourceRequestNumber },
      type: {
        value:
          ERequestType[
            request.humanResourceRequestType as unknown as keyof typeof ERequestType
          ],
      },
      date: { value: formatDate(request.humanResourceRequestDate) },
      status: {
        value:
          ERequestStatus[
            request.humanResourceRequestStatus as unknown as keyof typeof ERequestStatus
          ],
      },
      details: {
        value: <MdOutlineVisibility />,
        type: "icon" as const,
        onClick: () =>
          console.log(
            `Ver detalles de la solicitud ${request.humanResourceRequestId}`,
          ),
      },
      delete: {
        value: <MdDeleteOutline />,
        type: "icon" as const,
        onClick: () =>
          console.log(`Eliminar solicitud ${request.humanResourceRequestId}`),
      },
      dataDetails: {
        value: {
          ...parsedData,
          description:
            getValueFromData(parsedData, "observations", "") ??
            request.humanResourceRequestDescription,
          contract: getValueFromData(parsedData, "contractDesc", ""),
          observations: getValueFromData(parsedData, "observations", ""),
        },
      },
    };
  });
