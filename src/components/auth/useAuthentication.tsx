// useAuthentication.ts
import { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import { auth } from "@canva/user";

export const useAuthentication = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const { loginWithRedirect } = useAuth0();

  const initiateAuthenticationFlow = async () => {
    setIsAuthenticating(true);
    try {
      const response = await auth.requestAuthentication();
      if (response.status === "COMPLETED") {
        // loginWithRedirect();
        setIsAuthenticated(true);
      } else {
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticating(false);
    }
  };

  return { isAuthenticating, initiateAuthenticationFlow, isAuthenticated };
};
