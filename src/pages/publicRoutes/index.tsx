import { RouterProvider } from "react-router-dom";

import { publicRouter } from "@routes/protectedRouter";
import { GlobalStyles } from "@styles/global";

export function PublicRoutes() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={publicRouter} />
    </>
  );
}
