// paymentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PaymentState } from "src/components/types";



const initialState: PaymentState = {
  clientSecret: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setClientSecret: (state, action: PayloadAction<string | null>) => {
      state.clientSecret = action.payload;
    },
  },
});

export const { setClientSecret } = paymentSlice.actions;
export default paymentSlice.reducer;
