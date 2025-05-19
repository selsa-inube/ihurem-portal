import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import { formatDate } from "@utils/date";
import {
  EStatus,
  EType,
  HumanResourceRequest,
} from "@ptypes/humanResourcesRequest.types";

import { ICertificationsTable } from "../components/CertificationsTable/types";

export const formatHumanResourceData = (
  requests: HumanResourceRequest[],
): ICertificationsTable[] =>
  requests.map((request) => ({
    requestId: request.humanResourceRequestId,
    requestNumber: { value: request.humanResourceRequestNumber },
    type: {
      value:
        EType[
          request.humanResourceRequestType as unknown as keyof typeof EType
        ],
    },
    date: { value: formatDate(request.humanResourceRequestDate) },
    status: {
      value:
        EStatus[
          request.humanResourceRequestStatus as unknown as keyof typeof EStatus
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
        ...request.humanResourceRequestData,
        description: request.humanResourceRequestDescription,
      },
    },
  }));
