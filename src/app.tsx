// App.tsx
import React, { useEffect, useState } from "react";
import LoginButton from "./components/auth/Login";
import AuthenticatedApp from "./AuthenticatedApp";
import { useAuth0 } from "@auth0/auth0-react";
import Wrapper from "./components/auth/Loading";
import { auth } from "@canva/user";
import styles from "styles/components.css";
import { Rows } from "@canva/app-ui-kit";

const App: React.FC = () => {
  const [isCanvaAuthenticated, setIsCanvaAuthenticated] = useState(false);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await auth.getCanvaUserToken();
      setIsCanvaAuthenticated(token ? true : false);
    };

    checkAuthentication();
  }, []);

  if (isCanvaAuthenticated) {
    return (
      <div className={styles.scrollContainer}>
        <Rows spacing="2u">
          <Wrapper>
            User is authenticated with Canva.
            {isAuthenticated ? <AuthenticatedApp /> : <LoginButton />}
          </Wrapper>
        </Rows>
      </div>
    );
  } else {
    return (
      <div className={styles.scrollContainer}>
        <Wrapper>Please authenticate with Canva first.</Wrapper>
      </div>
    );
  }
};
export default App;
