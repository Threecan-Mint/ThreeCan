import { AppUiProvider } from "@canva/app-ui-kit";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "@canva/app-ui-kit/styles.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// store
import store, { persistor } from "./store";

const root = createRoot(document.getElementById("root")!);
function render() {
  root.render(
    <AppUiProvider>
      <Auth0Provider
        domain="dev-w4zhjgbo6zvcc1xf.us.auth0.com"
        clientId="JKp0NLtrAQoLf3xYUT7lJFlaVI9gTJoZ"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <App />
          </PersistGate>
        </Provider>
      </Auth0Provider>
    </AppUiProvider>
  );
}

render();

if (module.hot) {
  module.hot.accept("./app", render);
}
