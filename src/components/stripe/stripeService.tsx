// stripeService.ts
import { loadStripe } from '@stripe/stripe-js';

// Replace with your own Publishable Key
const PUBLISHABLE_KEY = 'pk_test_1234';

let stripePromise;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export const createCheckoutSession = async () => {
  const response = await fetch('/create-checkout-session', { method: 'POST' });
  return await response.json();
};

export const redirectToCheckout = async (sessionId: string) => {
  const stripe = await getStripe();
  return await stripe.redirectToCheckout({ sessionId });
};
