import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

const StripeProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const clientSecret = useSelector((state: RootState) => state.payment.clientSecret);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(data.clientSecret));
  }, []);

  return <>{clientSecret ? children : null}</>;
};

export default StripeProvider;
