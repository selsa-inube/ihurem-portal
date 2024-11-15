export interface IHolidaysTable {
  description: HolidayTableField<string>;
  date: HolidayTableField<string>;
  days: HolidayTableField<number>;
  status: HolidayTableField<string>;
  details: HolidayTableDetails;
  delete: HolidayTableAction;
  type?: HolidayTableField<string>;
  mobileActions?: HolidayTableField<JSX.Element>;
}

interface HolidayTableField<T> {
  value: T;
}

interface HolidayTableDetails
  extends HolidayTableField<string | number | JSX.Element> {
  type?: "icon" | "text" | "toggle" | "custom" | "type";
  onClick?: () => void;
}

interface HolidayTableAction
  extends HolidayTableField<string | number | JSX.Element> {
  type?: "icon" | "text" | "toggle" | "custom";
  onClick?: () => void;
}
