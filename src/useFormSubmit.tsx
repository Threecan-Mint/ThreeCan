import { useState } from "react";

interface FormState {
  chain: string;
  name: string;
  description: string;
  mint_to_address: string;
}

interface FormSubmitProps {
  walletAddress: string | null;
  exportedFile: File | null;
}

const useFormSubmit = ({ walletAddress, exportedFile }: FormSubmitProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any>(null);

  const initialFormState: FormState = {
    chain: "",
    name: "",
    description: "",
    mint_to_address: walletAddress || "",
  };

  const onFormSubmit = async (formData: FormState) => {
    setIsLoading(true);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });
      if (exportedFile) {
        form.append('file', exportedFile);
      }

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'xxxxx', // replace with your actual authorization
        },
        body: form,
      };

      const response = await fetch(
        `https://api.nftport.xyz/v0/mints/easy/files?chain=${formData.chain}`,
        requestOptions
      );
      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initialFormState,
    onFormSubmit,
    isLoading,
    responseData,
  };
};

export default useFormSubmit;
