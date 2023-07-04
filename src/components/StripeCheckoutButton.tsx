// StripeCheckoutButton.tsx
import React from 'react';
import { Button } from "@canva/app-ui-kit";
import { createCheckoutSession, redirectToCheckout } from './stripe/stripeService';

interface StripeCheckoutButtonProps {}

const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = () => {
  const handleClick = (event: any) => {
    event.preventDefault();
    createCheckoutSession()
      .then(session => {
        redirectToCheckout(session.url);
      })
      .catch(error => {
        console.error("Failed to checkout:", error);
      });
  };

  return (
    <form action="/create-checkout-session" method="POST">
      <Button variant="primary" onClick={handleClick}>
        Checkout
      </Button>
    </form>
  );
};

export default StripeCheckoutButton;
