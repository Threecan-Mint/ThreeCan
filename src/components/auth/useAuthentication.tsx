// useAuthentication.ts
import { useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import { auth } from "@canva/user";
import useAppState from "src/useAppState";

export const useAuthentication = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { setAuth } = useAppState();
  const GCF_VERIFY_TOKEN_URL =
    "https://us-central1-atomic-saga-392809.cloudfunctions.net/verify-token";
  // const { loginWithRedirect } = useAuth0();

  const verifyToken = async () => {
    try {
      setIsAuthenticating(true);
      const token = await auth.getCanvaUserToken();

      if (!token) return;

      const jsonResponse = await fetch(GCF_VERIFY_TOKEN_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("token: ", token);

      const response = await jsonResponse.json();

      if (response?.isAuthenticated) {
        // user is authenticated
        setAuth(response);
        setIsAuthenticating(false);
      }

      console.log("response: ", response);
    } catch (error) {
      console.error("Error while authenticating the user: ", error);
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const initiateAuthenticationFlow = async () => {
    setIsAuthenticating(true);
    try {
      const response = await auth.requestAuthentication();
      if (response.status === "COMPLETED") {
        // loginWithRedirect();
        verifyToken();
      } else {
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticating(false);
    }
  };

  return { isAuthenticating, initiateAuthenticationFlow };
};
