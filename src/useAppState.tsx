import { useState } from "react";

interface Auth {
  isAuthenticated: boolean;
  data?: {
    [key: string]: string;
  };
}

interface AppState {
  isLoading: boolean;
  exportData: File | null;
  responseData: any;
  walletAddress: string | null;
  auth: Auth;
}

const useAppState = () => {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    exportData: null,
    responseData: null,
    walletAddress: null,
    auth: {
      isAuthenticated: false,
      data: {},
    },
  });

  const setExportData = (data: File | null) => {
    setState((prevState) => ({ ...prevState, exportData: data }));
  };

  const setResponseData = (data: any) => {
    setState((prevState) => ({ ...prevState, responseData: data }));
  };

  const setWalletAddress = (address: string | null) => {
    setState((prevState) => ({ ...prevState, walletAddress: address }));
  };

  const setIsLoading = (isLoading: boolean) => {
    setState((prevState) => ({ ...prevState, isLoading }));
  };

  const setAuth = (auth: Auth) => {
    setState((prevState) => ({ ...prevState, auth }));
  };

  return {
    state,
    setExportData,
    setResponseData,
    setWalletAddress,
    setIsLoading,
    setAuth,
  };
};

export default useAppState;
