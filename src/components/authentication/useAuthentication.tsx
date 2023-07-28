import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { useCanvaAuth } from './canvaAuth';
import { useAuth0Auth } from './auth0Auth';

export const useAuthentication = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { isAuthenticated, isLoggedOut } = useSelector((state: RootState) => state.auth);
  const { initiateCanvaAuthenticationFlow } = useCanvaAuth();
  const { verifyAuth0Token } = useAuth0Auth();

  useEffect(() => {
    const checkAuthState = async () => {
      setIsAuthenticating(true);
      try {
        if (!isAuthenticated && !isLoggedOut) {
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
