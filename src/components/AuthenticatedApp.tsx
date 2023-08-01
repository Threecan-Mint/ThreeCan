import React from "react";
import { FormField, MultilineInput, Rows } from "@canva/app-ui-kit";
import ProfileSection from "./sections/ProfileSection";
import CheckoutSection from "./sections/CheckoutSection";
import LogoutButton from "./sections/profile/details/Logout";
import useAppState from "./useAppState";

const AuthenticatedApp: React.FC = () => {
  const { state, updateState } = useAppState();

  return (
    <Rows spacing={"2u"}>
      <ProfileSection
        state={state}
        updateWalletAddress={(address: string | null) => {
          updateState({ walletAddress: address });
        }} // use the correct function here
      />
      <CheckoutSection
        state={state}
        updateExportedFile={(file) => updateState({ exportData: file })}
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
      <LogoutButton />
    </Rows>
  );
};

export default AuthenticatedApp;
