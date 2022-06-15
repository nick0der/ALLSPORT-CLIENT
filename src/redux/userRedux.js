import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({

  name: "user",
  initialState:{
    currentUser : null,
    isFetching: false,
    error: false
  },
  reducers:{
    loginStart:(state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess:(state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginError:(state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutMethod:(state) => {
      state.currentUser = null;
      state.error = false;
    },
    registerStart:(state) => {
      state.isFetching = true;
      state.error = false;
    },
    registerSuccess:(state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    registerError:(state) => {
      state.isFetching = false;
      state.error = true;
    }
  }
})

export const {
  loginStart, loginSuccess, loginError, logoutMethod,
  registerStart, registerSuccess, registerError
} = userSlice.actions;

export default userSlice.reducer;
