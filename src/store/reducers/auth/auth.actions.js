import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  changePasswordUser,
  forgotPasswordUser,
  loginUser,
  logoutUser,
  recoverPasswordUser,
  registerUser,
} from "src/services/auth.service";

export const register = createAsyncThunk("auth/register", async (values, thunkAPI) => {
  try {
    const response = await registerUser(values);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk("auth/login", async (values, thunkAPI) => {
  try {
    const response = await loginUser(values);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
});

export const changePassword = createAsyncThunk("auth/changePassword", async (values, thunkAPI) => {
  try {
    const response = await changePasswordUser(values);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (values, thunkAPI) => {
  try {
    const response = await forgotPasswordUser(values);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const recoverPassword = createAsyncThunk(
  "auth/recoverPassword",
  async (values, thunkAPI) => {
    try {
      const response = await recoverPasswordUser(values);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
