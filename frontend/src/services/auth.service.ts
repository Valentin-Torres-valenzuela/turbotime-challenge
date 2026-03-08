import api from "@/lib/api";

export const authService = {
  async login(data: any) {
    const response = await api.post("auth/login/", data);
    if (response.data.access) {
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
    }
    return response.data;
  },
  async register(data: any) {
    const response = await api.post("auth/register/", data);
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
