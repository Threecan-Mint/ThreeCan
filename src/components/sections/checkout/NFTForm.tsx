import React, { FC } from 'react';
import useForm from './form/useForm';
import useFormSubmit from './form/useFormSubmit';
import { TextField } from './form/TextField';
import { SelectField } from './form/SelectField';
import { FormFields } from './form/useForm';
import { FormSubmitProps } from './form/useFormSubmit';

interface NFTFormComponentProps extends Omit<FormSubmitProps, 'formValues' | 'onFormSubmit'> {
  walletAddress: string | null;
  exportedFile: File | null;
  paymentStatus: string;
}

export const NFTForm: FC<NFTFormComponentProps> = ({ walletAddress, exportedFile, paymentStatus, ...formSubmitProps }) => {
  // Define the initial form state
  const initialFormState: FormFields = {
    chain: 'polygon',
    name: '',
    description: '',
    mint_to_address: walletAddress || '',
    file: exportedFile || null,
  };

  const { formValues, handleInputChange } = useForm(initialFormState);
  const handleFormSubmit = useFormSubmit({ ...formSubmitProps, formValues, walletAddress, exportedFile });

  return (
    <form onSubmit={handleFormSubmit}>
      <SelectField name="chain" value={formValues.chain} onChange={handleInputChange} options={['polygon', 'ethereum']} required />
      <TextField name="name" value={formValues.name} onChange={handleInputChange} required />
      <TextField name="description" value={formValues.description} onChange={handleInputChange} required />
      <TextField name="mint_to_address" value={formValues.mint_to_address} onChange={handleInputChange} required />
      <button type="submit">Mint NFT</button>
    </form>
  );
};

export default NFTForm;
