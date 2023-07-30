// App.tsx
import React,{useEffect} from "react";
import { Rows, Text } from "@canva/app-ui-kit";
import styles from "styles/components.css";
import AuthenticatedApp from "./AuthenticatedApp";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useAuthentication } from "./components/authentication/useAuthenticationOlder";

const App = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const {initiateAuthenticationFlow } = useAuthentication();

  useEffect(() => {
    if(!auth.isAuthenticated) {
      initiateAuthenticationFlow();
    }
  }, []);
  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        {auth.isAuthenticated ? (
          <AuthenticatedApp />
        ) : (
          <div>Loading...</div>
        )}
      </Rows>
    </div>
  );
};

export default App;
