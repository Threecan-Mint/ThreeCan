// useEthereum.ts
import { ethers } from "ethers";


// Define global window interface for Ethereum provider
declare global {
    interface Window {
      ethereum: ethers.Eip1193Provider;
    }
  } 

export const useEthereum = () => {
  const connectToEthereum = async () => {
    if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner();
        try {
          const address = await signer.getAddress();
return address;
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log('MetaMask not installed; using read-only defaults');
        return null
    }
  };

  return { connectToEthereum };
};
