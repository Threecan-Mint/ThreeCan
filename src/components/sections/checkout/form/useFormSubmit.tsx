// useFormSubmit.tsx
import { FormEvent } from 'react';
import { FormFields } from './useForm';
import { mintNFT } from './mintAPI'; // Import the function

export type FormSubmitProps = {
  // authToken: string; // Add authentication token
  walletAddress: string | null;
  paymentStatus: boolean;
  exportedFile: File | null;
  formValues: FormFields;
};

const useFormSubmit = ({ walletAddress, paymentStatus, exportedFile, formValues }: FormSubmitProps) => {
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!walletAddress || !paymentStatus || !exportedFile) {
      alert("Please connect your wallet, ensure you have at least 10 credits, and export the design first.");
      return;
    }

   await mintNFT(exportedFile, formValues); // Call the function
  
  };

  return handleFormSubmit;
};

export default useFormSubmit;
