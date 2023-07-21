// App.tsx
import React, { useEffect } from "react";
import { Rows, Text } from "@canva/app-ui-kit";
import LoginButton from "./components/auth/Login";
import styles from "styles/components.css";
import AuthenticatedApp from "./AuthenticatedApp";
// import { useAuth0 } from "@auth0/auth0-react";
import { auth } from "@canva/user";
import useAppState from "./useAppState";

const App: React.FC = () => {
  // const { isAuthenticated } = useAuth0();
  const { state } = useAppState();

  useEffect(() => {
    const getToken = async () => {
      const token = await auth.getCanvaUserToken();
      console.log("token: ", token);
    };
    getToken();
  }, []);

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>To create an NFT, link your wallet,</Text>
        {state.auth.isAuthenticated ? <AuthenticatedApp /> : <LoginButton />}
      </Rows>
    </div>
  );
};

export default App;
