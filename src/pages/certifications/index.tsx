import { certificationsNavConfig } from "./config/nav.config";
import { CertificationsOptionsUI } from "./interface";

function CertificationsOptions() {
  return (
    <CertificationsOptionsUI
      appName={certificationsNavConfig[0].label}
      appRoute={certificationsNavConfig[0].crumbs}
      navigatePage={certificationsNavConfig[0].url}
    />
  );
}

export { CertificationsOptions };
