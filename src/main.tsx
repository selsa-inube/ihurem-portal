import React from "react";
import ReactDOM from "react-dom/client";
import { FlagProvider } from "@inubekit/inubekit";

import { ErrorModalProvider } from "./context/ErrorModalContext/ErrorModalContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <FlagProvider>
      <ErrorModalProvider>
        <App />
      </ErrorModalProvider>
    </FlagProvider>
  </React.StrictMode>,
);
