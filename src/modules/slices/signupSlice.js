import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  signSuccess: false,
  signFailure: false,
};

export const signupRequestAction = (userInfo) => {
  return {
    type: "signupRequest",
    data: userInfo,
  };
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupSuccess: (state, data) => {
      state.signupData = data;
      state.signSuccess = true;
    },
    signupFailure: (state, data) => {
      state.signupData = data;
      state.signFailure = true;
    },
    signout: (state) => {
      state.signupData = null;
      state.signSuccess = false;
      state.signFailure = false;
    },
  },
});

export const { signupSuccess, signupFailure, signout } = signupSlice.actions;
export default signupSlice.reducer;
