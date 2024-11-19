import { Route, Routes } from "react-router-dom";

import { HolidaysOptions } from "@pages/holidays";

function HolidaysRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HolidaysOptions />} />
    </Routes>
  );
}

export { HolidaysRoutes };
