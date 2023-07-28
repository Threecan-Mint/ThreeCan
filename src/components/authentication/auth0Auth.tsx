import { auth as auth0Auth } from "@auth0/auth0-react";

export const useAuth0Auth = () => {
  const verifyAuth0Token = async () => {
    try {
      const token = await auth0Auth.getAccessTokenSilently();

      if (!token) return false;

      const jsonResponse = await fetch(`${BACKEND_HOST}/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await jsonResponse.json();

      return response?.isAuthenticated || false;
    } catch (error) {
      console.error("Error while authenticating the user with Auth0: ", error);
      return false;
    }
  };

  return { verifyAuth0Token };
};
