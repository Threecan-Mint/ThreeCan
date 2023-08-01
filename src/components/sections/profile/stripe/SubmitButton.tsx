// components/sections/profile/stripe/SubmitButton.tsx
import React from "react";

interface Props {
  isDisabled: boolean;
}

const SubmitButton: React.FC<Props> = ({ isDisabled }) => {
  return (
    <button disabled={isDisabled} id="submit">
      Pay now
    </button>
  );
};

export default SubmitButton;
