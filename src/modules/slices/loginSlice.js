import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginData: null,
  lginSuccess: false,
  loginFailure: false,
};

export const loginRequestAction = (userInfo) => {
  return {
    type: "LoginRequest",
    userInfo,
  };
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    LoginSuccess: (state, data) => {
      state.loginData = data;
      state.loginSuccess = true;
    },
    LoginFailure: (state, data) => {
      state.loginData = data;
      state.loginFailure = true;
    },
    Logout: (state) => {
      state.loginData = null;
      state.loginSuccess = false;
      state.loginFailure = false;
    },
  },
});

export const { LoginSuccess, LoginFailure, Logout } = loginSlice.actions;
export default loginSlice.reducer;
