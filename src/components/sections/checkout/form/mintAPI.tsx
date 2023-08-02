// mintAPI.tsx
import { FormFields } from './useForm';

export const mintNFT = async (
//   authToken: string,
  exportedFile: File,
  formValues: FormFields,
) => {
  const formData = new FormData();
  Object.entries(formValues).forEach(([key, value]) => {
    if (key !== 'file') {
      formData.append(key, value as string);
    }
  });

  formData.append('file', exportedFile);

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    //   'Authorization': authToken,
    },
    body: formData,
  };

  const response = await fetch(`${BACKEND_HOST}/mint`, requestOptions);
  return response.json();
};
