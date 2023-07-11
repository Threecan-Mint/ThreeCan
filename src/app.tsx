// App.tsx
import React from "react";
import { Rows, Text } from "@canva/app-ui-kit";
import LoginButton from "./components/auth/Login";
import styles from "styles/components.css";
import AuthenticatedApp from "./AuthenticatedApp";
import { useAuth0 } from "@auth0/auth0-react";
import Wrapper from "./components/auth/Loading";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className={styles.scrollContainer}>
      <Wrapper>
      <Rows spacing="2u">
        <Text>To create an NFT, link your wallet,</Text>
        {isAuthenticated ? <AuthenticatedApp /> : <LoginButton />}
      </Rows>
      </Wrapper>
    </div>
  );
};

export default App;
