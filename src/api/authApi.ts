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

interface User {
  id: number;
  username: string;
  email: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user?: User;
}

export const authApi = {
  // Логин
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      "/api/auth/login/",
      credentials
    );

    // Сохраняем токены
    TokenManager.setTokens({
      access: response.data.access,
      refresh: response.data.refresh,
    });

    return response.data;
  },

  // Регистрация
  register: async (
    credentials: RegisterCredentials
  ): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      "/api/auth/register/",
      credentials
    );

    // Сохраняем токены
    TokenManager.setTokens({
      access: response.data.access,
      refresh: response.data.refresh,
    });

    return response.data;
  },

  // Логаут
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

    // Очищаем токены локально
    TokenManager.clearTokens();
  },

  // Получение профиля пользователя
  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get<User>("/api/auth/profile/");
    return response.data;
  },

  // Проверка авторизации
  isAuthenticated: (): boolean => {
    return TokenManager.hasValidTokens();
  },
};
