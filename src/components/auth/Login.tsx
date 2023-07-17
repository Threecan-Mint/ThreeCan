// LoginButton.tsx
import React, { FC, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton: FC = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { loginWithRedirect } = useAuth0();

  const initiateAuthenticationFlow = async () => {
    console.log("initiateAuthenticationFlow");
    setIsAuthenticating(true);
    try {
      await loginWithRedirect();
    } catch (error) {
      console.error(error);
      setIsAuthenticating(false);
    }
  };

  return (
    <button onClick={initiateAuthenticationFlow} disabled={isAuthenticating}>
      {isAuthenticating ? "Authenticating..." : "Log In"}
    </button>
  );
};

export default LoginButton;
