// App.tsx
import React, { useEffect, useState } from "react";
import { Rows, Text } from "@canva/app-ui-kit";
import styles from "styles/components.css";
import AuthenticatedApp from "./components/AuthenticatedApp";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { useAuthentication } from "./components/authentication/useAuthenticationOlder";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51NObRaDWbmSOfM6E1q6592Pf53DrVmiAFaLKNz2E0RsxqgEjsWnZ6DZEYt47NNZv79FPCI3jFePLPQjSje9Uzfik00osAUT5E9"
);

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const clientSecret = useSelector(
    (state: RootState) => state.payment.clientSecret
  );
  const { initiateAuthenticationFlow } = useAuthentication();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      initiateAuthenticationFlow();
    }
  }, []);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(data.clientSecret));
  }, []);

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        {auth.isAuthenticated && clientSecret && (
          <Elements stripe={stripePromise}>
            <AuthenticatedApp />
          </Elements>
        )}
      </Rows>
    </div>
  );
};

export default App;
