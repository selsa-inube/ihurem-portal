import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { FlagProvider } from "@inubekit/inubekit";

import { environment } from "@config/environment";

import App from "./App";

const redirect_uri = environment.REDIRECT_URI;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={environment.AUTH0_DOMAIN}
      clientId={environment.CLIENT_ID}
      authorizationParams={{
        redirect_uri,
      }}
    >
      <FlagProvider>
        <App />
      </FlagProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
