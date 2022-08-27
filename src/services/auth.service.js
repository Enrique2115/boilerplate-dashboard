import { API_HOST } from "src/Config/Constants";
import axiosInstance from "./axiosInstance";
import { removeRefreshToken, removeToken, setRefreshToken, setToken } from "./token.service";

export const registerUser = async (user) => {
  const url = `${API_HOST}/api/auth/register`;
  const response = await axiosInstance.post(url, user);
  return response.data;
};

export const loginUser = async (data) => {
  const url = `${API_HOST}/auth/login`;
  const result = await axiosInstance.post(url, data);

  if (result.data?.token && result.data?.refreshToken) {
    setToken(result.data?.token);
    setRefreshToken(result.data?.refreshToken);
  }

  return {
    id: result.data?.id,
    role: result.data?.role,
    username: result.data?.username,
  };
};

export const logoutUser = () => {
  removeToken();
  removeRefreshToken();
};

export const changePasswordUser = async (data) => {
  const url = `${API_HOST}/auth/change-password`;
  const result = await axiosInstance.post(url, data);
  return result.data;
};

export const forgotPasswordUser = async (data) => {
  const url = `${API_HOST}/auth/forgot-password`;
  const result = await axiosInstance.post(url, data);
  return result.data;
};

export const recoverPasswordUser = async (data) => {
  const url = `${API_HOST}/auth/recover-password`;
  const result = await axiosInstance.post(url, data);
  return result.data;
};
