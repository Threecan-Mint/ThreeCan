import { useState, ChangeEvent } from 'react';

export type FormFields = {
  chain: 'polygon' | 'ethereum';
  name: string;
  description: string;
  mint_to_address: string;
  file: File | null;
};

const useForm = (initialState: FormFields) => {
  const [formValues, setFormValues] = useState<FormFields>(initialState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  return { formValues, handleInputChange };
};

export default useForm;