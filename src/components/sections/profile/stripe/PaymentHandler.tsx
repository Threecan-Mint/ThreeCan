import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { setCredits } from '../../../../store/slices/user';

export const usePaymentHandler = (clientSecret: string | null) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
  
    const handlePayment = async () => {
      if (!stripe || !elements || !clientSecret) return null;
  
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return { error: 'Card information is missing.' };
  
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          // Other billing details
        },
      });
  
      if (error) {
        console.error(error.message);
        return { error: error.message };
      }
  
      dispatch(setCredits(100));
      return { success: true };
    };
  
    const isDisabled = !stripe || !elements;
  
    return { handlePayment, isDisabled };
  };
