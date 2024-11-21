export interface IPendingVacationDaysTable {
  start_date: HolidayTableField<string>;
  concept: HolidayTableField<string>;
  days: HolidayTableField<number>;
  mobileActions?: HolidayTableField<JSX.Element>;
  type?: HolidayTableField<string>;
}

interface HolidayTableField<T> {
  value: T;
}
