// StripeCheckoutButton.tsx
import React from 'react';
import { Button } from "@canva/app-ui-kit";
import { createCheckoutSession, redirectToCheckout } from './stripe/stripeService';

interface StripeCheckoutButtonProps {
  onPaymentStatus: (status: string) => void;
}

const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({ onPaymentStatus }) => {
  const handleClick = async () => {
    try {
      const session = await createCheckoutSession();
      const result = await redirectToCheckout(session.id);

      if (result.error) {
        onPaymentStatus(result.error.message);
      }
    } catch (error) {
      console.error("Failed to checkout:", error);
    }
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Checkout
    </Button>
  );
};

export default StripeCheckoutButton;
