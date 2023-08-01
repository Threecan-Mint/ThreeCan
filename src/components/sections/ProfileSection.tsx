// ProfileSection.tsx
import React from "react";
import WalletConnection from "./profile/WalletConnection";
import Profile from "./profile/details/Profile";
import { AppState } from "../types"; // Import or define types as needed

interface ProfileSectionProps {
    state: AppState;
    updateWalletAddress: (address: string | null) => void; // change the name here
  }

const ProfileSection: React.FC<ProfileSectionProps> = ({ state, updateWalletAddress }) => (
  <div>
    <Profile />
    <WalletConnection
        walletAddress={state.walletAddress}
        setWalletAddress={updateWalletAddress}
      />
  </div>
);

export default ProfileSection;
