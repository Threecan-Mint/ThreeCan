import React, { useState } from 'react';
import { Button, Rows, Text, FormField, MultilineInput } from '@canva/app-ui-kit';
import WalletConnection from './components/WalletConnection';
import StripeCheckoutButton from './components/StripeCheckoutButton';
import styles from 'styles/components.css';
import NFTForm from './components/NFTForm';
import ExportDesign from './components/ExportDesign';
import useStripePayment from './hooks/useStripePayment';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exportData, setExportData] = useState<File | null>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  // const { paymentStatus } = useStripePayment();

  const initialFormState = {
    chain: '',
    name: '',
    description: '',
    mint_to_address: walletAddress || '',
  };

  const onFormSubmit = async (formData: typeof initialFormState) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.nftport.xyz/v0/mints/easy/files?chain=${formData.chain}`, formData.requestOptions);
      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>To create an NFT, link your wallet,</Text>
        <WalletConnection walletAddress={walletAddress} setWalletAddress={setWalletAddress} />
        {/* <StripeCheckoutButton /> */}
        <ExportDesign setExportedFile={setExportData} />
        <NFTForm initialFormState={initialFormState} onFormSubmit={onFormSubmit} exportedFile={exportData}/>
        {exportData && (
          <FormField
            label="Export response"
            value={JSON.stringify(exportData, null, 2)}
            control={(props) => (
              <MultilineInput {...props} maxRows={7} autoGrow readOnly />
            )}
          />
        )}
      </Rows>
    </div>
  );
};

export default App;
