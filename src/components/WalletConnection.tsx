// WalletConnection.tsx
import React, { useEffect, useState } from 'react';
import ConnectButton from './wallet/ConnectButton';
import WalletInfo from './wallet/WalletInfo';
import { useEthereum } from './wallet/useEthereum';

interface WalletConnectionProps {
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ walletAddress, setWalletAddress }) => {
  const { connectToEthereum } = useEthereum();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWalletAddress = async () => {
      const address = await connectToEthereum();
      if (address !== undefined) {
        setWalletAddress(address);
      }
      setIsLoading(false);
    };
    loadWalletAddress();
  }, [connectToEthereum, setWalletAddress]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ConnectButton setWalletAddress={setWalletAddress} />
          <WalletInfo walletAddress={walletAddress} />
        </>
      )}
    </div>
  );
};

export default WalletConnection;
