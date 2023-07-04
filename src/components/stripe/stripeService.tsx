// stripeService.ts
export const createCheckoutSession = async () => {
    const response = await fetch('https://nftmintpayment-ymnzh6rdlq-uc.a.run.app/create-checkout-session', { method: 'POST' });
    const data = await response.json();
    return data;
  };
  
  export const redirectToCheckout = (url: string) => {
    window.location.href = url;
  };
  