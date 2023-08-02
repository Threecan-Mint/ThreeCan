export interface Auth {
  isAuthenticated: boolean;
  isLoggedOut: boolean;
  data?: {
    [key: string]: string;
  };
}

export interface PaymentState {
  clientSecret: string | null;
}

export interface AppState {
  isLoading: boolean;
  exportData: File | null;
  responseData: any;
  walletAddress: string | null;
  credits: number;
}