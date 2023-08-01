import { useState } from 'react';

type PaymentResult = {
    error?: string;
    success?: boolean;
  } | null;

export const useCheckout = (handlePayment: () => Promise<PaymentResult>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await handlePayment();

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(true);
    }

    setLoading(false);
  };

  return { handleSubmit, loading, error, success };
};
