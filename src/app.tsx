import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { auth } from "@canva/user";
import styles from "styles/components.css";
import { Rows } from "@canva/app-ui-kit";
import AuthenticatedApp from "./AuthenticatedApp";

const App: React.FC = () => {
  const [isCanvaAuthenticated, setIsCanvaAuthenticated] = useState(false);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await auth.getCanvaUserToken();
        setIsCanvaAuthenticated(token ? true : false);
  
        if(!token) {
          // If not authenticated, initiate the authentication flow
          await auth.requestAuthentication();
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkAuthentication();
  }, []);

  if (isCanvaAuthenticated) {
    return (
      <div className={styles.scrollContainer}>
        <Rows spacing="2u">
          User is authenticated with Canva.
          {isAuthenticated ? <AuthenticatedApp /> : "Logging in..."}
        </Rows>
      </div>
    );
  } else {
    return (
      <div className={styles.scrollContainer}>
        <Rows spacing="2u">
          Please authenticate with Canva first.
        </Rows>
      </div>
    );
  }
};

export default App;
