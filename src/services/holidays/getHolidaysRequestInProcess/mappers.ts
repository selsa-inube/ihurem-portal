import { IHolidaysInProcess } from "@src/types/holidays.types";

const mapHolidaysInProcessApiToEntity = (
  item: Record<string, IHolidaysInProcess>,
): IHolidaysInProcess => {
  const buildItem: IHolidaysInProcess = {
    vacationId: String(item.vacationId ?? ""),
    contractId: String(item.contractId ?? ""),
    vacationType: String(item.vacationType ?? ""),
    startDateVacationEnjoyment: String(item.startDateVacationEnjoyment ?? ""),
    nonWorkingDaysOfVacation: Number(item.nonWorkingDaysOfVacation ?? 0),
    joiningLetter: String(item.joiningLetter ?? ""),
    earlyReturnDate: String(item.earlyReturnDate ?? ""),
    vacationDaysPendingEarlyReturn: String(
      item.vacationDaysPendingEarlyReturn ?? "",
    ),
    vacationStatus: String(item.vacationStatus ?? ""),
    vacationPaymentDate: String(item.vacationPaymentDate ?? ""),
  };
  return buildItem;
};

const mapHolidaysInProcessApiToEntities = (
  items: Record<string, IHolidaysInProcess>[],
): IHolidaysInProcess[] => {
  return items.map(mapHolidaysInProcessApiToEntity);
};

export { mapHolidaysInProcessApiToEntity, mapHolidaysInProcessApiToEntities };
