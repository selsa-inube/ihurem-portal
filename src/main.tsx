import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import { enviroment } from "@config/environment";

import App from "./App";

const redirect_uri = enviroment.REDIRECT_URI;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={enviroment.AUTH0_DOMAIN}
      clientId={enviroment.CLIENT_ID}
      authorizationParams={{
        redirect_uri,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
