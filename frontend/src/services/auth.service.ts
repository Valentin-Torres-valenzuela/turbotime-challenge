import api from "@/lib/api";
import { hashPassword } from "@/lib/crypto";

export const authService = {
  async login(data: any) {
    const hashedPassword = await hashPassword(data.password);
    const response = await api.post("auth/login/", {
      ...data,
      password: hashedPassword
    });
    if (response.data.access) {
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
    }
    return response.data;
  },
  async register(data: any) {
    const hashedPassword = await hashPassword(data.password);
    const response = await api.post("auth/register/", {
      ...data,
      password: hashedPassword
    });
    return response.data;
  },
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
  isAuthenticated() {
    return !!localStorage.getItem("accessToken");
  }
};
