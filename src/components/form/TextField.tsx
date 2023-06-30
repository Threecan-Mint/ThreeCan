import React, { FC, ChangeEvent } from 'react';
import { Text } from "@canva/app-ui-kit";

interface TextFieldProps {
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
  }
  
  export const TextField: FC<TextFieldProps> = ({ name, value, onChange, required }) => (
    <Text>
      {name.charAt(0).toUpperCase() + name.slice(1)}:
      <input type="text" name={name} value={value} onChange={onChange} required={required} />
    </Text>
  );