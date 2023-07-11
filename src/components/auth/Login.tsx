// LoginButton.tsx
import React, { FC } from "react";
import { useAuthentication } from "./useAuthentication";

const LoginButton: FC = () => {
  const { isAuthenticating, initiateAuthenticationFlow } = useAuthentication();

  return (
    <button onClick={initiateAuthenticationFlow} disabled={isAuthenticating}>
      {isAuthenticating ? "Authenticating..." : "Log In"}
    </button>
  );
};

export default LoginButton;


