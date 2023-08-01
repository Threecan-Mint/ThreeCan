import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const PaymentForm: React.FC = () => {
  return (
    <div>
      <CardElement id="card-element" />
    </div>
  );
};

export default PaymentForm;
