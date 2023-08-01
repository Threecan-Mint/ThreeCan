import { FormEvent } from 'react';
import { FormFields } from './useForm'; 

export type FormSubmitProps = {
  walletAddress: string | null;
  paymentStatus?: string;
  exportedFile: File | null;
  formValues: FormFields;
  onFormSubmit?: (data: {chain: string, requestOptions: RequestInit}) => void;
};

const useFormSubmit = ({ walletAddress, paymentStatus, exportedFile, formValues, onFormSubmit }: FormSubmitProps) => {
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!walletAddress || !paymentStatus || !exportedFile) {
      alert("Please connect your wallet, complete the payment, and export the design first.");
      return;
    }

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      if(key !== 'file') {
        formData.append(key, value as string);
      }
    });

    // Append the exported design file
    formData.append('file', exportedFile);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'xxxxx',
      },
      body: formData,
    };
    if (onFormSubmit) {
      onFormSubmit({ chain: formValues.chain, requestOptions });
    }
  };

  return handleFormSubmit;
};

export default useFormSubmit;