import React, { FC, ChangeEvent } from 'react';
import { Text } from "@canva/app-ui-kit";

interface SelectFieldProps {
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    required?: boolean;
  }
  
  export const SelectField: FC<SelectFieldProps> = ({ name, value, onChange, options, required }) => (
    <Text>
      {name.charAt(0).toUpperCase() + name.slice(1)}:
      <select name={name} value={value} onChange={onChange} required={required}>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </Text>
  );