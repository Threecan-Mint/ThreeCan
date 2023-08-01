import React, { FC, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51NObRaDWbmSOfM6E1q6592Pf53DrVmiAFaLKNz2E0RsxqgEjsWnZ6DZEYt47NNZv79FPCI3jFePLPQjSje9Uzfik00osAUT5E9");

interface StripeProviderProps {
  children: React.ReactNode;
}

const StripeProvider: FC<StripeProviderProps> = ({ children }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetchClientSecret();
  }, []);

  const fetchClientSecret = async () => {
    try {
      const res = await fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      });

      const data = await res.json();

      setClientSecret(data.clientSecret);
    } catch (err) {
      console.log(err);
    }
  };

  if (!clientSecret) return null;

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
