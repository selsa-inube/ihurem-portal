import { Route, Routes } from "react-router-dom";

import { HolidaysOptions } from "@pages/holidays";
import { RequestEnjoyment } from "@pages/holidays/RequestEnjoyment";

function HolidaysRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HolidaysOptions />} />
      <Route path="/request-enjoyment" element={<RequestEnjoyment />} />
    </Routes>
  );
}

export { HolidaysRoutes };
