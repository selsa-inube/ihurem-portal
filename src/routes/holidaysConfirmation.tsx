import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { HolidaysConfirmation } from "@pages/holidaysConfirmation";

function HolidaysConfirmationRoutes() {
  return (
    <Routes>
      <Route path="/:requestId" element={<HolidaysConfirmation />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export { HolidaysConfirmationRoutes };
