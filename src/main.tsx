import React from "react";
import ReactDOM from "react-dom/client";
import { FlagProvider } from "@inubekit/inubekit";

import { environment } from "@config/environment";

import { AuthProvider } from "./context/AuthContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <AuthProvider
      originatorId={environment.ORIGINATOR_ID}
      callbackUrl={environment.REDIRECT_URI}
      iAuthUrl={environment.IAUTH_URL}
    >
      <FlagProvider>
        <App />
      </FlagProvider>
    </AuthProvider>
  </React.StrictMode>,
);
