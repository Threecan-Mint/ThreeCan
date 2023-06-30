// WalletInfo.tsx
import React from 'react';

interface WalletInfoProps {
  walletAddress: string | null;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ walletAddress }) => {
  return (
    <div>
      <p>Address: {walletAddress}</p>
    </div>
  );
};

export default WalletInfo;
