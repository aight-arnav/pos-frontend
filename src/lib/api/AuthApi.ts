import { ApiClient } from "./ApiClient";
import {
  LoginForm,
  SignupForm,
  UserData,
} from "@/lib/types/Auth";

export const AuthApi = {
  signup: async (form: SignupForm) => {
    const res = await ApiClient.post<UserData>("/auth/signup", form);
    return res.data;
  },

  login: async (form: LoginForm) => {
    const res = await ApiClient.post<UserData>("/auth/login", form);
    return res.data;
  },

  logout: async () => {
    await ApiClient.post("/auth/logout");
  },

  verify: async () => {
    const res = await ApiClient.get<UserData>("/auth/verify");
    return res.data;
  },
};