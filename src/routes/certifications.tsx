import { Route, Routes } from "react-router-dom";

import { CertificationsOptions } from "@pages/certifications";

function CertificationsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CertificationsOptions />} />
    </Routes>
  );
}

export { CertificationsRoutes };
