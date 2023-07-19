// LoginButton.tsx
import React, { FC } from "react";
// import { useAuthentication } from "./useAuthentication";

type LoginButtonProps = {
  isAuthenticating: boolean;
  initiateAuthenticationFlow: () => void;
};

const LoginButton: FC = ({
  isAuthenticating,
  initiateAuthenticationFlow,
}: LoginButtonProps) => {
  // const { isAuthenticating, initiateAuthenticationFlow } = useAuthentication();

  return (
    <button onClick={initiateAuthenticationFlow} disabled={isAuthenticating}>
      {isAuthenticating ? "Authenticating..." : "Log In"}
    </button>
  );
};

export default LoginButton;
