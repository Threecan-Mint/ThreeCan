// App.tsx
import React, { useEffect } from "react";
import { Rows, Text } from "@canva/app-ui-kit";
import LoginButton from "./components/auth/Login";
import styles from "styles/components.css";
import AuthenticatedApp from "./AuthenticatedApp";
// import { useAuth0 } from "@auth0/auth0-react";
import { useAuthentication } from "./components/auth/useAuthentication";
import { auth } from "@canva/user";

const App: React.FC = () => {
  // const { isAuthenticated } = useAuth0();
  const { isAuthenticating, initiateAuthenticationFlow, isAuthenticated } =
    useAuthentication();

  const GCF_VERIFY_TOKEN_URL =
    "https://us-central1-atomic-saga-392809.cloudfunctions.net/verify-token";

  //todo  Need to implement the verify token functionality in gcf - 'verify-token'.
  const verifyToken = async () => {
    try {
      const token = await auth.getCanvaUserToken();

      const jsonResponse = await fetch(GCF_VERIFY_TOKEN_URL, {
        headers: {
          Authentication: `Bearer ${token}`,
        },
      });

      const response = await jsonResponse.json();

      if (response?.isAuthenticated) {
        // user is authenticated
      } else {
        // user is not authenticated
      }

      console.log("response: ", response);
    } catch (error) {
      console.error("Error while authenticating the user: ", error);
    }
  };

  useEffect(() => {
    // verifyToken();
  }, []);

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>To create an NFT, link your wallet,</Text>
        {isAuthenticated ? (
          <AuthenticatedApp />
        ) : (
          <LoginButton
            isAuthenticating={isAuthenticating}
            initiateAuthenticationFlow={initiateAuthenticationFlow}
          />
        )}
      </Rows>
    </div>
  );
};

export default App;
