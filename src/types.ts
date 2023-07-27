export interface Auth {
  isAuthenticated: boolean;
  isLoggedOut: boolean;
  data?: {
    [key: string]: string;
  };
}
