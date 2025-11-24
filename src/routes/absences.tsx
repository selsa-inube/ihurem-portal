import { Route, Routes } from "react-router-dom";

import { AbsencesOptions } from "@pages/absences";
import { ReportAbsence } from "@pages/absences/ReportAbsence";

function AbsencesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AbsencesOptions />} />
      <Route path="/report-absence" element={<ReportAbsence />} />
    </Routes>
  );
}

export { AbsencesRoutes };
