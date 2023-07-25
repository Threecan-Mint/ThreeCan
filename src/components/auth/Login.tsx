// LoginButton.tsx
import React from "react";
import { useAuthentication } from "../authentication/useAuthenticationOlder";

const LoginButton = () => {
  const { isAuthenticating, initiateAuthenticationFlow } = useAuthentication();

  return (
    <button onClick={initiateAuthenticationFlow} disabled={isAuthenticating}>
      {isAuthenticating ? "Authenticating..." : "Log In"}
    </button>
  );
};

export default LoginButton;
