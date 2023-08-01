// ConnectButton.tsx
import React from 'react';
import { Button } from "@canva/app-ui-kit";
import { useEthereum } from './useEthereum';

interface ConnectButtonProps {
  setWalletAddress: (address: string | null) => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ setWalletAddress }) => {
  const { connectToEthereum } = useEthereum();

  const handleConnect = async () => {
    const address = await connectToEthereum();
    if (address !== undefined) {
      setWalletAddress(address);
    }
  };

  return (
    <Button variant="primary" onClick={handleConnect}>
      Connect
    </Button>
  );
};

export default ConnectButton;
