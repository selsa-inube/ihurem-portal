import { Route, Routes } from "react-router-dom";

import { CertificationsOptions } from "@pages/certifications";
import { RequestEnjoyment } from "@src/pages/certifications/NewCertification";

function CertificationsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CertificationsOptions />} />
      <Route path="/new-certification" element={<RequestEnjoyment />} />
    </Routes>
  );
}

export { CertificationsRoutes };
