import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import AuthWrapper from "./components/providers/AuthWrapper";
import StripeProvider from "./components/providers/StripeProvider";
import useAppState from "./state/useAppState";
import styles from "styles/components.css";
import loadStripePromise from "./components/providers/stripe";
import AuthenticatedApp from "./components/AuthenticatedApp";

const App = () => {
  const { state, updateState } = useAppState();

  return (
    <div className={styles.scrollContainer}>
      <AuthWrapper>
        <Elements stripe={loadStripePromise}>
          <StripeProvider>
            <AuthenticatedApp state={state} updateState={updateState} />
          </StripeProvider>
        </Elements>
      </AuthWrapper>
    </div>
  );
};

export default App;
