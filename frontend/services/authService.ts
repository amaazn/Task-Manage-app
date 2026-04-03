import API from "./api";
import { LoginRequest, RegisterRequest, AuthResponse } from "../types/auth";

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data: RegisterRequest): Promise<AuthResponse> => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const logoutUser = async () => {
  await API.post("/auth/logout");
};