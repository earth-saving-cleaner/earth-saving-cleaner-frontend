import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  successData: null,
  failureData: null,
  loginSuccess: false,
  loginFailure: false,
};

export const loginRequestAction = (userInfo) => {
  return {
    type: "LOG_IN_REQUEST",
    userInfo: userInfo.tokenId,
  };
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    LOG_IN_SUCCESS: (state, data) => {
      state.successData = data;
      state.loginSuccess = true;
    },
    LOG_IN_FAILURE: (state, data) => {
      state.failureData = data;
      state.loginFailure = true;
    },
  },
});

export const { LOG_IN_SUCCESS, LOG_IN_FAILURE } = loginSlice.actions;
export default loginSlice.reducer;
