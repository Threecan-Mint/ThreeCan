// AuthenticatedApp.tsx
import React from "react";
import { FormField, MultilineInput } from "@canva/app-ui-kit";
import WalletConnection from "./components/WalletConnection";
import ExportDesign from "./components/ExportDesign";
import NFTForm from "./components/NFTForm";
import Profile from "./components/auth/Profile";
import LogoutButton from "./components/auth/Logout";
import useAppState from "./useAppState";
import { Rows, Text } from "@canva/app-ui-kit";

const AuthenticatedApp: React.FC = () => {
  const { state, updateState } = useAppState();

  return (
    <>
      <Text>To create an NFT, link your wallet,</Text>
      <Profile />
      <LogoutButton />
      <WalletConnection
        walletAddress={state.walletAddress}
        setWalletAddress={(address) => updateState({ walletAddress: address })}
      />
      <ExportDesign setExportedFile={(file) => updateState({ exportData: file })} />
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
