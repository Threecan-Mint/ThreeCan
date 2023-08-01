import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useAuthentication } from "./useAuthenticationOlder";

const AuthWrapper: React.FC = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const { initiateAuthenticationFlow } = useAuthentication();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      initiateAuthenticationFlow();
    }
  }, [auth.isAuthenticated]);

  return <>{auth.isAuthenticated ? children : null}</>;
};

export default AuthWrapper;
