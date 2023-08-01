import { useEffect, useState } from "react";
import { initiateCanvaAuthenticationFlow } from "./canvaAuth";
import { useAuth0Auth } from "./auth0Auth";
import useAppState from "../../useAppState";

export const useAuthentication = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { updateState } = useAppState();
  const { verifyAuth0Token } = useAuth0Auth();

  useEffect(() => {
    const checkAuthState = async () => {
      setIsAuthenticating(true);
      try {
        const authStateFromLocalStorage = localStorage.getItem('auth');
        if (authStateFromLocalStorage) {
          const parsedState = JSON.parse(authStateFromLocalStorage);
          updateState({ auth: parsedState });
        } else {
          const canvaAuthenticated = await initiateCanvaAuthenticationFlow();
          if (canvaAuthenticated) {
            await verifyAuth0Token();
          }
        }
      } finally {
        setIsAuthenticating(false);
      }
    };
    checkAuthState();
  }, []);

  return { isAuthenticating };
};
