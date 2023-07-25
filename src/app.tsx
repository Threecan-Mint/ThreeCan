import React, { useEffect } from "react";
import { Rows, Text } from "@canva/app-ui-kit";
import styles from "styles/components.css";
import AuthenticatedApp from "./AuthenticatedApp";
import useAppState from "./useAppState";
import { useAuthentication } from "./components/authentication/useAuthenticationOlder";

const App: React.FC = () => {
  const { state } = useAppState();
  const { initiateAuthenticationFlow } = useAuthentication();

  useEffect(() => {
    if(!state.auth.isAuthenticated) {
      initiateAuthenticationFlow();
    }
    console.log(state.auth)
  }, []);

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>To create an NFT, link your wallet,</Text>
        {state.auth.isAuthenticated ? <AuthenticatedApp /> : <div>this hasn't loaded {state.auth}</div>}
      </Rows>
    </div>
  );
};

export default App;
