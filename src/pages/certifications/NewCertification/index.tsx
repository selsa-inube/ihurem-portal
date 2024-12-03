import { certificationsNavConfig } from "../config/nav.config";
import { NewCertificationUI } from "./interface";

function NewCertification() {
  return (
    <NewCertificationUI
      appName={certificationsNavConfig[1].label}
      appRoute={certificationsNavConfig[1].crumbs}
      navigatePage={certificationsNavConfig[1].url}
    />
  );
}

export { NewCertification };
