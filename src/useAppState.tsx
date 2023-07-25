import { useState } from "react";

interface Auth { isAuthenticated: boolean; data?: { [key: string]: string; }; }
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
    auth: { isAuthenticated: false, data: {} },
  });

  const updateState = (newState: Partial<AppState>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  return { state, updateState };
};

export default useAppState;