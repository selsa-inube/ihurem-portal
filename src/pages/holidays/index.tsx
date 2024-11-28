import { useState, useEffect } from "react";

import { getHolidaysRequestInProcess } from "@services/holidays/getHolidaysRequestInProcess";

import { holidaysNavConfig } from "./config/nav.config";
import { HolidaysOptionsUI } from "./interface";
import { IHolidaysTable } from "./components/HolidaysTable/types";
import { formatHolidaysData } from "./config/table.config";

function HolidaysOptions() {
  const [tableData, setTableData] = useState<IHolidaysTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      setIsLoading(true);

      try {
        const holidays = await getHolidaysRequestInProcess();
        const formattedData = formatHolidaysData(holidays || []);
        setTableData(formattedData);
      } catch (error) {
        console.error("Error al obtener las vacaciones:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <HolidaysOptionsUI
      appName={holidaysNavConfig[0].label}
      appRoute={holidaysNavConfig[0].crumbs}
      tableData={tableData}
      isLoading={isLoading}
    />
  );
}

export { HolidaysOptions };
