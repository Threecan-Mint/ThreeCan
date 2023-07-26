import { useState } from "react";

interface AppState {
  isLoading: boolean;
  exportData: File | null;
  responseData: any;
  walletAddress: string | null;
}

const useAppState = () => {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    exportData: null,
    responseData: null,
    walletAddress: null,
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

  return {
    state,
    setExportData,
    setResponseData,
    setWalletAddress,
    setIsLoading,
  };
};

export default useAppState;
