import { Route, Routes } from "react-router-dom";

import { HolidaysConfirmation } from "@pages/holidaysConfirmation";

function HolidaysConfirmationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HolidaysConfirmation />} />
    </Routes>
  );
}

export { HolidaysConfirmationRoutes };
