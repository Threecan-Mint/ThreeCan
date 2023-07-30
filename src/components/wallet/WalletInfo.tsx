// WalletInfo.tsx
import React from 'react';
import {Text} from "@canva/app-ui-kit";
interface WalletInfoProps {
  walletAddress: string | null;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ walletAddress }) => {
  return (
      <Text>Address: {walletAddress}</Text>
  );
};

export default WalletInfo;
