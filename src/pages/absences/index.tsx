import { breadcrumbs } from "./config/nav.config";
import { AbsencesOptionsUI } from "./interface";

function AbsencesOptions() {
  return (
    <AbsencesOptionsUI
      appName={breadcrumbs.label}
      appRoute={breadcrumbs.crumbs}
      navigatePage={breadcrumbs.url}
    />
  );
}

export { AbsencesOptions };
