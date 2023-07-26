// App.tsx
import React from "react";
import { Rows, Text } from "@canva/app-ui-kit";
import LoginButton from "./components/auth/Login";
import styles from "styles/components.css";
import AuthenticatedApp from "./AuthenticatedApp";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useAuthentication } from "./components/auth/useAuthentication";

const App = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { isAuthenticating, initiateAuthenticationFlow } = useAuthentication();

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>To create an NFT, link your wallet,</Text>
        {auth.isAuthenticated ? (
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
