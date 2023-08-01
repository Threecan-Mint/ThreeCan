// CheckoutSection.tsx
import React from "react";
import ExportDesign from "./checkout/ExportDesign";
import NFTForm from "./checkout/NFTForm";
import { AppState } from "../types"; // Import or define types as needed

interface CheckoutSectionProps {
  state: AppState;
  updateExportedFile: (file: any) => void; // Define the type of 'file' appropriately
}

const CheckoutSection: React.FC<CheckoutSectionProps> = ({ state, updateExportedFile }) => (
  <div>
    <ExportDesign setExportedFile={updateExportedFile} />
    <NFTForm
      exportedFile={state.exportData}
      walletAddress={state.walletAddress}
      paymentStatus={state.credits >= 10} // Check if the user has at least 10 credits
    />
  </div>
);

export default CheckoutSection;
