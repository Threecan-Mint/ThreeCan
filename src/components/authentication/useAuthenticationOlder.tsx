// useAuthentication.ts
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "src/store/slices/auth";
import { auth } from "@canva/user";
import { RootState } from "src/store";

export const useAuthentication = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { isAuthenticated, isLoggedOut } = useSelector(
    (state: RootState) => state.auth
  );
  const disptach = useDispatch();

  const verifyToken = async () => {
    try {
      setIsAuthenticating(true);
      const token = await auth.getCanvaUserToken();

      if (!token) return;

      const jsonResponse = await fetch(`${BACKEND_HOST}/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await jsonResponse.json();

      if (response?.isAuthenticated) {
        disptach(setAuth(response));
      }

      setIsAuthenticating(false);
    } catch (error) {
      console.error("Error while authenticating the user: ", error);
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated && !isLoggedOut) {
      verifyToken();
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

  return { isAuthenticating, initiateAuthenticationFlow };
};
