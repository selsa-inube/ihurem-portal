import { IHolidaysInProcess } from "@ptypes/holidays.types";

const mapHolidaysInProcessApiToEntity = (
  item: IHolidaysInProcess,
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
  items: IHolidaysInProcess[],
): IHolidaysInProcess[] => {
  return items.map(mapHolidaysInProcessApiToEntity);
};

export { mapHolidaysInProcessApiToEntity, mapHolidaysInProcessApiToEntities };
