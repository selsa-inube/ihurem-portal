import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import {
  ERequestType,
  ERequestStatus,
  HumanResourceRequest,
} from "@ptypes/humanResourcesRequest.types";
import { Employee } from "@ptypes/employeePortalConsultation.types";
import { formatDate } from "@utils/date";
import { parseDataSafely, getValueFromData } from "@utils/parser";

import { IDaysUsedTable } from "../components/DaysUsedTable/types";

export const formatHolidaysData = (holidays: HumanResourceRequest[]) =>
  holidays.map((holiday) => {
    const parsedData = parseDataSafely(holiday.humanResourceRequestData);

    const daysValue = (getValueFromData(parsedData, "daysToPay", null) ??
      getValueFromData(parsedData, "daysOff", 0)) as number;

    return {
      requestId: holiday.humanResourceRequestId,
      requestNumber: holiday.humanResourceRequestNumber,
      description: {
        value:
          ERequestType[
            holiday.humanResourceRequestType as unknown as keyof typeof ERequestType
          ],
      },
      date: {
        value: formatDate(holiday.humanResourceRequestDate),
      },
      days: {
        value: daysValue,
      },
      status: {
        value:
          ERequestStatus[
            holiday.humanResourceRequestStatus as unknown as keyof typeof ERequestStatus
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
              vacation.vacationType === "Pagadas" ? "Pagadas" : "Disfrutadas",
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
