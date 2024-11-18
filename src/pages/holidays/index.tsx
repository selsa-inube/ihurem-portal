import { holidaysNavConfig } from "./config/nav.config";
import { HolidaysOptionsUI } from "./interface";

function HolidaysOptions() {
  return (
    <HolidaysOptionsUI
      appName={holidaysNavConfig[0].label}
      appRoute={holidaysNavConfig[0].crumbs}
    />
  );
}

export { HolidaysOptions };
