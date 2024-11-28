import { Route, Routes } from "react-router-dom";

import { CertificationsOptions } from "@pages/certifications";
import { RequestNewCertification } from "@src/pages/certifications/NewCertification";

function CertificationsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CertificationsOptions />} />
      <Route path="/new-certification" element={<RequestNewCertification />} />
    </Routes>
  );
}

export { CertificationsRoutes };
