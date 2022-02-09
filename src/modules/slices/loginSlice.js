import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginData: null,
  lginSuccess: false,
  loginFailure: false,
};

export const loginRequestAction = (userInfo) => {
  return {
    type: "loginRequest",
    userInfo,
  };
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, data) => {
      state.loginData = data;
      state.loginSuccess = true;
    },
    loginFailure: (state, data) => {
      state.loginData = data;
      state.loginFailure = true;
    },
    logout: (state) => {
      state.loginData = null;
      state.loginSuccess = false;
      state.loginFailure = false;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;
export default loginSlice.reducer;
