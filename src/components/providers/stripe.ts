import { loadStripe } from "@stripe/stripe-js";

const loadStripePromise = loadStripe(
  "pk_test_51NObRaDWbmSOfM6E1q6592Pf53DrVmiAFaLKNz2E0RsxqgEjsWnZ6DZEYt47NNZv79FPCI3jFePLPQjSje9Uzfik00osAUT5E9"
);

export default loadStripePromise;
