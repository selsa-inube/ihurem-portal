import { Route, Routes } from "react-router-dom";

import { AbsencesOptions } from "@pages/absences";

function AbsenscesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AbsencesOptions />} />
    </Routes>
  );
}

export { AbsenscesRoutes };
