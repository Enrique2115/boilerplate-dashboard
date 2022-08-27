import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  logout,
  changePassword,
  forgotPassword,
  recoverPassword,
} from "./auth.actions";

const initialState = { loading: false, authInfo: null, error: null, success: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    //Login actions
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.authInfo = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Register actions
    [register.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [register.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Logout actions
    [logout.fulfilled]: (state, action) => {
      state.loading = false;
      state.authInfo = null;
      state.error = null;
      state.success = null;
    },

    //Change password actions
    [changePassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    [changePassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Reset password actions
    [forgotPassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Recover password actions
    [recoverPassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [recoverPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    [recoverPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
