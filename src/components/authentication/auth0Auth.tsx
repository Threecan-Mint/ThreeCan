import { useAuth0 } from "@auth0/auth0-react";
import { useAppState } from "src/useAppState";

export const useAuth0Auth = () => {
  const { updateState } = useAppState();
  const { getAccessTokenSilently } = useAuth0();

  const verifyAuth0Token = async () => {
    try {
      const token = await getAccessTokenSilently();
      if (token) {
        const authState = { isAuthenticated: true, data: { token } };
        updateState({ auth: authState });
        localStorage.setItem('auth', JSON.stringify(authState));
      }
    } catch (error) {
      console.error("Error while verifying Auth0 token: ", error);
    }
  };

  return { verifyAuth0Token };
};
