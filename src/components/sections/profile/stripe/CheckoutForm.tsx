import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import PaymentForm from './PaymentForm';
import SubmitButton from './SubmitButton';
import { usePaymentHandler } from './PaymentHandler';
import { useCheckout } from './useCheckout';

const CheckoutForm: React.FC = () => {
  const clientSecret = useSelector((state: RootState) => state.payment.clientSecret);
  const { handlePayment } = usePaymentHandler(clientSecret);
  const { handleSubmit, loading, error, success } = useCheckout(handlePayment);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentForm />
      <SubmitButton isDisabled={loading} />
      {loading && <p>Processing payment...</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Payment successful!</p>}
      {/* rest of the form */}
    </form>
  );
};

export default CheckoutForm;
