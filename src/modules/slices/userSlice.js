import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoading = true;
      state.data = null;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    unregistered: (state, action) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.isLoading = false;
      state.data = null;
      state.error = null;
    },
    signup: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = false;
    },
    signupFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
