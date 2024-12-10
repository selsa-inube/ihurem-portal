import { holidaysNavConfig } from "../config/nav.config";
import { RequestPaymentUI } from "./interface";

function RequestPayment() {
  return (
    <RequestPaymentUI
      appName={holidaysNavConfig[2].label}
      appRoute={holidaysNavConfig[2].crumbs}
      navigatePage={holidaysNavConfig[2].url}
    />
  );
}

export { RequestPayment };
