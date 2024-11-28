import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import { formatDate } from "@utils/date";
import { IHolidaysInProcess } from "@src/types/holidays.types";

import { VacationType, AuthorizationStatus } from "./enums";

export const formatHolidaysData = (holidays: IHolidaysInProcess[]) =>
  holidays.map((holiday) => ({
    description: {
      value:
        VacationType[
          holiday.vacationType.toUpperCase() as keyof typeof VacationType
        ],
    },
    date: { value: formatDate(holiday.startDateVacationEnjoyment) },
    days: { value: holiday.nonWorkingDaysOfVacation },
    status: {
      value:
        AuthorizationStatus[
          holiday.vacationStatus.toUpperCase() as keyof typeof AuthorizationStatus
        ],
    },
    details: {
      value: <MdOutlineVisibility />,
      type: "icon" as const,
      onClick: () => console.log("Ver detalles"),
    },
    delete: {
      value: <MdDeleteOutline />,
      type: "icon" as const,
      onClick: () => console.log("Eliminar vacaciones"),
    },
  }));
