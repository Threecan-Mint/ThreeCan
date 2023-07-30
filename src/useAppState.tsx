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

  const updateState = (newState: Partial<AppState>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  return { state, updateState };
};

export default useAppState;