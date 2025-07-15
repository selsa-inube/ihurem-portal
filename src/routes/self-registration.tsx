import { Route, Routes } from "react-router-dom";

import { SelfRegistration } from "@pages/self-registration";

function SelfRegistrationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SelfRegistration />} />
    </Routes>
  );
}

export { SelfRegistrationRoutes };
