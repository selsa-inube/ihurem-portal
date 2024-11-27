import { holidaysNavConfig } from "../config/nav.config";
import { RequestEnjoymentUI } from "./interface";

function RequestEnjoyment() {
  return (
    <RequestEnjoymentUI
      appName={holidaysNavConfig[1].label}
      appRoute={holidaysNavConfig[1].crumbs}
      navigatePage={holidaysNavConfig[1].url}
    />
  );
}

export { RequestEnjoyment };
