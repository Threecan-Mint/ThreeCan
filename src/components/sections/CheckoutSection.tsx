// CheckoutSection.tsx
import React from "react";
import ExportDesign from "./checkout/ExportDesign";
import CheckoutForm from "./profile/stripe/CheckoutForm";
import NFTForm from "./checkout/NFTForm";
import { AppState } from "../types"; // Import or define types as needed

interface CheckoutSectionProps {
  state: AppState;
  updateExportedFile: (file: any) => void; // Define the type of 'file' appropriately
}

const CheckoutSection: React.FC<CheckoutSectionProps> = ({ state, updateExportedFile }) => (
  <div>
    <ExportDesign setExportedFile={updateExportedFile} />
    <CheckoutForm />
    <NFTForm
      exportedFile={state.exportData}
      walletAddress={state.walletAddress}
      paymentStatus={"true"} // Assuming you have this in your state
    />
  </div>
);

export default CheckoutSection;
