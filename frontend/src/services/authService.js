// authService.js
import { post } from "./apiService";

export const login = (credentials) => post("/auth/login", credentials);
export const register = (userData) => post("/auth/register", userData);

export const saveToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const logout = () => localStorage.removeItem("token");
