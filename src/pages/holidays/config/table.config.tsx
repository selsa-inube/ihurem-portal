import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import {
  EStatus,
  EType,
  IVacationGeneralInformationEntry,
  HumanResourceRequest,
} from "@ptypes/humanResourcesRequest.types";
import { formatDate } from "@utils/date";
import { IDaysUsedTable } from "../components/DaysUsedTable/types";

import { VacationType } from "./enums";

function isVacationData(
  data: unknown,
): data is IVacationGeneralInformationEntry {
  return (
    typeof data === "object" &&
    data !== null &&
    "startDate" in data &&
    "daysOff" in data
  );
}

export const formatHolidaysData = (holidays: HumanResourceRequest[]) =>
  holidays.map((holiday) => {
    const isVacation =
      holiday.humanResourceRequestType === EType.vacations &&
      isVacationData(holiday.humanResourceRequestData);

    const vacationData = isVacation
      ? (holiday.humanResourceRequestData as IVacationGeneralInformationEntry)
      : null;

    return {
      requestId: holiday.humanResourceRequestId,
      requestNumber: holiday.humanResourceRequestNumber,
      description: {
        value: vacationData
          ? VacationType[
              vacationData.typeOfRequest as keyof typeof VacationType
            ]
          : "",
      },
      date: {
        value: formatDate(holiday.humanResourceRequestDate),
      },
      days: {
        value: isVacation ? Number(vacationData?.daysOff ?? 0) : 0,
      },
      status: {
        value:
          EStatus[
            holiday.humanResourceRequestStatus as unknown as keyof typeof EStatus
          ],
      },
      details: {
        value: <MdOutlineVisibility />,
        type: "icon" as const,
        onClick: () =>
          console.log(
            `Ver detalles de la solicitud ${holiday.humanResourceRequestId}`,
          ),
      },
      delete: {
        value: <MdDeleteOutline />,
        type: "icon" as const,
        onClick: () =>
          console.log(`Eliminar solicitud ${holiday.humanResourceRequestId}`),
      },
      dataDetails: {
        value: {
          ...holiday.humanResourceRequestData,
          startDate:
            isVacation && vacationData?.startDate
              ? formatDate(vacationData.startDate)
              : "",
          description: holiday.humanResourceRequestDescription,
        },
      },
    };
  });

export const daysUsedMock: IDaysUsedTable[] = [
  {
    startDate: { value: "22/Mar/2025" },
    usageMode: { value: "Pagadas" },
    days: { value: 15 },
  },
  {
    startDate: { value: "03/Jun/2023" },
    usageMode: { value: "Disfrutadas" },
    days: { value: 15 },
  },
  {
    startDate: { value: "28/Dic/2021" },
    usageMode: { value: "Disfrutadas" },
    days: { value: 15 },
  },
];
