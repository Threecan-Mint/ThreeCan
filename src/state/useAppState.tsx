import { useState } from "react";
import { AppState } from "../types/types";


const useAppState = () => {
  const [state, setState] = useState<AppState>({
    isLoading: false,
    exportData: null,
    responseData: null,
    walletAddress: null,
    credits: 0,
  });

  const updateState = (newState: Partial<AppState>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  return { state, updateState };
};

export default useAppState;