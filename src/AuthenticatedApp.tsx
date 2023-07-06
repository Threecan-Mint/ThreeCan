// AuthenticatedApp.tsx
import React from 'react';
import { FormField, MultilineInput } from "@canva/app-ui-kit";
import WalletConnection from "./components/WalletConnection";
import ExportDesign from "./components/ExportDesign";
import NFTForm from "./components/NFTForm";
import Profile from "./components/auth/Profile";
import LogoutButton from "./components/auth/Logout";
import useAppState from "./useAppState";

const AuthenticatedApp: React.FC = () => {
  const { state, setExportData, setWalletAddress } = useAppState();

  return (
    <>
      <Profile />
      <LogoutButton />
      <WalletConnection
        walletAddress={state.walletAddress}
        setWalletAddress={setWalletAddress}
      />
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
  );
};

export default AuthenticatedApp;
