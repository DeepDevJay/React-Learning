import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from "../constants/auth";

export const setAuth = ({ token, refreshToken, user }) => {
  localStorage.setItem(ACCESS_TOKEN, token);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
  localStorage.setItem(USER, JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(USER);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(ACCESS_TOKEN);
};
