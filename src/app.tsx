// App.tsx
import React from "react";
import {
  Button,
  Rows,
  Text,
  FormField,
  MultilineInput,
} from "@canva/app-ui-kit";
import WalletConnection from "./components/WalletConnection";
import StripeCheckoutButton from "./components/StripeCheckoutButton";
import styles from "styles/components.css";
import NFTForm from "./components/NFTForm";
import ExportDesign from "./components/ExportDesign";
// import useStripePayment from "./hooks/useStripePayment";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/auth/Login";
import LogoutButton from "./components/auth/Logout";
import Profile from "./components/auth/Profile";
import useAppState from "./useAppState";
import useFormSubmit,{FormSubmitProps} from "./components/form/useFormSubmit";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const { state, setExportData, setWalletAddress } = useAppState();
  const { isAuthenticated } = useAuth0();

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>To create an NFT, link your wallet,</Text>
        <WalletConnection
          walletAddress={state.walletAddress}
          setWalletAddress={setWalletAddress}
        />
        {isAuthenticated ? (
          <>
            <Profile />
            <LogoutButton />
            <ExportDesign setExportedFile={setExportData} />
            <NFTForm
              exportedFile={state.exportData}
              walletAddress={state.walletAddress}
              paymentStatus={"true"} // Assuming you have this in your state
            />
            {state.exportData && (
              <FormField
                label="Export response"
                value={JSON.stringify(state.exportData, null, 2)}
                control={(props) => (
                  <MultilineInput {...props} maxRows={7} autoGrow readOnly />
                )}
              />
            )}
          </>
        ) : (
          <LoginButton />
        )}
      </Rows>
    </div>
  );
};

export default App;
