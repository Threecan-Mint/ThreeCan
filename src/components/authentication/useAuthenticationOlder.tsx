import { useEffect, useState } from "react";
import { auth } from "@canva/user";
import useAppState from "src/useAppState";

export const useAuthentication = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { updateState } = useAppState();

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if(storedAuth) {
      updateState({ auth: JSON.parse(storedAuth) });
    } else {
      initiateAuthenticationFlow();
    }
  }, []);

  const initiateAuthenticationFlow = async () => {
    setIsAuthenticating(true);
    try {
      const response = await auth.requestAuthentication();
      if (response.status === "COMPLETED") {
        verifyToken();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const verifyToken = async () => {
    try {
      const token = await auth.getCanvaUserToken();
      if (!token) return;

      const jsonResponse = await fetch(`${BACKEND_HOST}/verify-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const response = await jsonResponse.json();
      
      if (response?.isAuthenticated) {
        updateState({ auth: response });
        localStorage.setItem('auth', JSON.stringify(response));
      }
    } catch (error) {
      console.error("Error while authenticating the user: ", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return { isAuthenticating, initiateAuthenticationFlow };
};
