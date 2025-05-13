export interface IDaysUsedTable {
  startDate: HolidayTableField<string>;
  usageMode: HolidayTableField<string>;
  days: HolidayTableField<number>;
}

interface HolidayTableField<T> {
  value: T;
}
