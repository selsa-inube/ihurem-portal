import { breadcrumbs } from "./config/nav.config";
import { AbsencesOptionsUI } from "./interface";

function AbsencesOptions() {
  const handleDeleteRequest = () => {
    return;
  };

  return (
    <AbsencesOptionsUI
      appName={breadcrumbs.label}
      appDescription={breadcrumbs.description}
      appRoute={breadcrumbs.crumbs}
      navigatePage={breadcrumbs.url}
      handleDeleteRequest={handleDeleteRequest}
    />
  );
}

export { AbsencesOptions };
