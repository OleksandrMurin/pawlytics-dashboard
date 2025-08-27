// src/api/authApi.ts
import axiosInstance, { TokenManager } from "./axiosInstance";

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      "/api/auth/login/",
      credentials
    );
    TokenManager.setTokens({
      access: response.data.access,
      refresh: response.data.refresh,
    });

    return response.data;
  },

  register: async (
    credentials: RegisterCredentials
  ): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      "/api/auth/register/",
      credentials
    );

    TokenManager.setTokens({
      access: response.data.access,
      refresh: response.data.refresh,
    });

    return response.data;
  },

  logout: async (): Promise<void> => {
    const refreshToken = TokenManager.getRefreshToken();

    if (refreshToken) {
      try {
        await axiosInstance.post("/api/auth/logout/", {
          refresh: refreshToken,
        });
      } catch (error) {
        console.warn("Ошибка при логауте на сервере:", error);
      }
    }

    TokenManager.clearTokens();
  },

  isAuthenticated: (): boolean => {
    return TokenManager.hasValidTokens();
  },
};
