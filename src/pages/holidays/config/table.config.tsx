import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import {
  ERequestType,
  HumanResourceRequest,
  requestTypeMap,
  requestTypeLabels,
} from "@ptypes/humanResourcesRequest.types";
import { Employee } from "@ptypes/employeePortalConsultation.types";
import { formatDate } from "@utils/date";
import { parseDataSafely, getValueFromData } from "@utils/parser";

import { HumanResourceRequestStatus } from "./enums";
import { IDaysUsedTable } from "../components/DaysUsedTable/types";

export const formatHolidaysData = (holidays: HumanResourceRequest[]) =>
  holidays.map((holiday) => {
    const parsedData = parseDataSafely(holiday.humanResourceRequestData);

    const isPaidVacation =
      holiday.humanResourceRequestType === ERequestType.paid_vacations;

    const daysValue = (getValueFromData(parsedData, "daysToPay", null) ??
      getValueFromData(parsedData, "daysOff", 0)) as number;

    const displayDate = isPaidVacation
      ? (getValueFromData(parsedData, "disbursementDate", "") as string)
      : holiday.humanResourceRequestDate;

    const typeKey = Object.entries(requestTypeMap).find(
      ([, slug]) => slug === holiday.humanResourceRequestType,
    )?.[0] as keyof typeof requestTypeMap | undefined;

    return {
      requestId: holiday.humanResourceRequestId,
      requestNumber: holiday.humanResourceRequestNumber,
      description: {
        value: typeKey
          ? requestTypeLabels[typeKey as ERequestType]
          : holiday.humanResourceRequestType,
      },
      date: {
        value: formatDate(displayDate),
      },
      days: {
        value: daysValue,
      },
      status: {
        value:
          HumanResourceRequestStatus[
            holiday.humanResourceRequestStatus as unknown as keyof typeof HumanResourceRequestStatus
          ] ?? "Estado desconocido",
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
          ...parsedData,
          startDate: getValueFromData(parsedData, "startDate", "")
            ? formatDate(
                getValueFromData(parsedData, "startDate", "") as string,
              )
            : "",
          description: getValueFromData(parsedData, "observations", ""),
          contract: getValueFromData(parsedData, "contract", ""),
          observations: getValueFromData(parsedData, "observations", ""),
        },
      },
    };
  });

export const formatVacationHistory = (
  employees: Employee[],
): (IDaysUsedTable & { businessName: string; contractType: string })[] => {
  const allVacations: (IDaysUsedTable & {
    businessName: string;
    contractType: string;
  })[] = [];
  employees.forEach((employee) => {
    if (
      !employee.employmentContracts ||
      employee.employmentContracts.length === 0
    ) {
      return;
    }
    employee.employmentContracts.forEach((contract) => {
      contract.vacationsHistory.forEach((vacation) => {
        allVacations.push({
          startDate: {
            value: formatDate(vacation.startDateVacationEnjoyment),
          },
          usageMode: {
            value:
              vacation.vacationType === "holiday_pay"
                ? "Pagadas"
                : "Disfrutadas",
          },
          days: {
            value: vacation.businessDaysOfVacation,
          },
          businessName: contract.businessName,
          contractType: contract.contractType,
        });
      });
    });
  });

  return allVacations;
};
