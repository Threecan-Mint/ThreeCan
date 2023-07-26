// LoginButton.tsx
import React from "react";

// types
interface LoginButtonProps {
  isAuthenticating: boolean;
  initiateAuthenticationFlow: () => void;
}

const LoginButton = ({
  initiateAuthenticationFlow,
  isAuthenticating,
}: LoginButtonProps) => {
  return (
    <button onClick={initiateAuthenticationFlow} disabled={isAuthenticating}>
      {isAuthenticating ? "Authenticating..." : "Log In"}
    </button>
  );
};

export default LoginButton;
