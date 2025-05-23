import { useEffect, useState } from "react";
import Holidays from "date-holidays";
import { IOption } from "@inubekit/inubekit";

import { environment } from "@config/environment";

export function useDayOptions(
  year: string,
  month: string,
  selectedDay: string,
) {
  const COUNTRY = environment.COUNTRY;
  const includeSaturday = environment.INCLUDES_SATURDAYS === "Y";
  const [dayOptions, setDayOptions] = useState<IOption[]>([]);
  const [day, setDay] = useState<string>(selectedDay);

  useEffect(() => {
    if (!year || !month) {
      setDayOptions([]);
      return;
    }
    const hd = new Holidays(COUNTRY);
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    const today = new Date();
    const totalDays = new Date(y, m + 1, 0).getDate();
    const options: IOption[] = Array.from({ length: totalDays }, (_, idx) => {
      const d = idx + 1;
      const date = new Date(y, m, d);
      const isPast =
        y === today.getFullYear() &&
        m === today.getMonth() &&
        d < today.getDate();
      const isSunday = date.getDay() === 0;
      const isSaturday = date.getDay() === 6;
      const isHoliday = hd.isHoliday(date);
      if (
        !isPast &&
        !isSunday &&
        (includeSaturday || !isSaturday) &&
        !isHoliday
      ) {
        const label = String(d).padStart(2, "0");
        return { id: String(d), value: label, label };
      }
      return null;
    }).filter((o): o is IOption => o !== null);
    setDayOptions(options);
  }, [year, month, COUNTRY, includeSaturday]);

  return { dayOptions, selectedDay: day, setSelectedDay: setDay };
}
