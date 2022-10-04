import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connecting: true,
  public_address: null,
  chain_abbreviation: null,
  loading: false,
  error_message: "",
  signer: null,
  provider: null,
};

export const walletSlicer = createSlice({
  initialState,
  name: "walletSlicer",
  reducers: {
    WALLET_REQUEST: (state, action) => {
      let newState = { ...state };
      newState.loading = true;
      newState.error_message = "";
      newState.connecting = true;
      return newState;
    },
    WALLET_SUCCESS: (state, action) => {
      let newState = { ...state };
      newState.loading = false;
      newState.public_address = action.payload.public_address;
      newState.chain_abbreviation = action.payload.chain_abbreviation;
      newState.error_message = "";
      newState.connecting = false;
      return newState;
    },
    WALLET_ERROR: (state, action) => {
      let newState = { ...state };
      newState.loading = false;
      newState.error_message = action.payload.error_message;
      newState.connecting = false;
      return newState;
    },
    WALLET_DISCONNECT: (state, action) => {
      let newState = { ...state };
      newState.loading = false;
      newState.public_address = null;
      newState.chain_abbreviation = null;
      newState.error_message = "";
      newState.connecting = false;
      return newState;
    },
    WALLET_CHAIN_UPDATE: (state, action) => {
      let newState = { ...state };
      newState.loading = false;
      newState.chain_abbreviation = action.payload.chain_abbreviation;
      newState.error_message = "";
      newState.connecting = false;
      return newState;
    },
  },
});

export const {
  WALLET_REQUEST,
  WALLET_ERROR,
  WALLET_SUCCESS,
  WALLET_DISCONNECT,
  WALLET_CHAIN_UPDATE,
} = walletSlicer.actions;

export default walletSlicer.reducer;
