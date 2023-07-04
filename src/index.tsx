import { AppUiProvider } from "@canva/app-ui-kit";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "@canva/app-ui-kit/styles.css";
import { Auth0Provider } from "@auth0/auth0-react";

const root = createRoot(document.getElementById("root")!);
function render() {
  root.render(
    <AppUiProvider>
      <Auth0Provider
        domain="{yourDomain}"
        clientId="{yourClientId}"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </AppUiProvider>
  );
}

render();

if (module.hot) {
  module.hot.accept("./app", render);
}
