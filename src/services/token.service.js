import {
  HOUR_UTC,
  MAX_AGE_REFRESH_TOKEN,
  MAX_AGE_TOKEN,
  REFRESH_TOKEN,
  TOKEN,
} from "src/Config/Constants";
import Cookies from "js-cookie";

export const setToken = (token) => {
  Cookies.set(TOKEN, token, {
    expires: new Date(Date.now() + (Number(MAX_AGE_TOKEN) - Number(HOUR_UTC)) * 1000),
    path: "/",
    secure: true,
    sameSite: "strict",
  });
};

export const getToken = () => Cookies.get(TOKEN);

export const removeToken = () => Cookies.remove(TOKEN);

export const setRefreshToken = (token) => {
  Cookies.set(REFRESH_TOKEN, token, {
    expires: new Date(Date.now() + (Number(MAX_AGE_REFRESH_TOKEN) - Number(HOUR_UTC)) * 1000),
    path: "/",
    secure: true,
    sameSite: "strict",
  });
};

export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN);

export const removeRefreshToken = () => Cookies.remove(REFRESH_TOKEN);
